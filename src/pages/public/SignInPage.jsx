import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '@components/CustomeInputs';
import useForm from '@hooks/useForm.js';
import { toast } from 'react-toastify';
import { getUserProfile, renewAccessJWT, userLogin } from '../../axio/axioHelper.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@redux/user/userSlice.js';
import Spinner from 'react-bootstrap/Spinner';
import { loginFormFields } from '@/assets/customeInputes/loginFormFields.js';
// import { loginFormFields } from '@/assets/customeInputes/loginFormFields.js';
const initialState = {}
const SignInPage = () => {
    const { form, setForm, handleOnChange } = useForm(initialState);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userInfo)
    const navigate = useNavigate()
    // const showLoadingRef = useRef(true)
    const [showLoading, setShowLoading] = useState(true)
    const location = useLocation();
    // console.log(location)
    const path = location?.state?.from ?? '/user'
    useEffect(() => {
        const run = async () => {

            if (user?._id) {
                // if we have user in redux store
                navigate(path);

            } else {
                // #AUTO LOGIN FEATURE - 1 
                // when we refresh browser user data wiped out from redux store
                // but we have acccess token in browser memory so we can get user details 
                // using accessJWT and auto login using that token
                // login below
                const accessJWT = sessionStorage.getItem('accessJWT')
                if (accessJWT) {

                    const user = await getUserProfile();
                    if (user.user?._id) {
                        dispatch(setUser(user.user))//this will update the user._id 
                    }
                    // so useEffect run again as per dependencies
                    if (user.message === "jwt expired" || user.message === "Unauthorized") {


                        const refreshJWT = sessionStorage.getItem('refreshJWT')
                        const newAccessJWT = await renewAccessJWT()
                        // console.log(newAccessJWT.payload)
                        sessionStorage.setItem('accessJWT', newAccessJWT.payload)

                        const user = await getUserProfile();
                        user.user?._id && dispatch(setUser(user.user))
                    }

                }
                else {
                    const refreshJWT = sessionStorage.getItem('refreshJWT')
                    const newAccessJWT = await renewAccessJWT()
                    // console.log(newAccessJWT.payload)
                    sessionStorage.setItem('accessJWT', newAccessJWT.payload)

                    const user = await getUserProfile();
                    user.user?._id && dispatch(setUser(user.user))
                }


            }

        };

        run();

        // if token found then it may take 3 sec to fetch data so we show loader for 3 sec
        if (sessionStorage.getItem('refreshJWT') || sessionStorage.getItem('accessJWT')) {
            setTimeout(() => { setShowLoading(false) }, 2000)
        }
        else {
            // if token not found then immdiately show the login page NO-WAIT
            setShowLoading(false)
        }


    }, [user?._id, navigate]);

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            // console.log(form);
            const { email, password } = form
            // if (!validatePassword(password)) {
            //     toast.error("Password must contain 8 characters including uppercase, lowercase, number, and special symbol.");
            //     return;
            // }
            const loginRes = await userLogin(form);
            // console.log(loginRes)
            sessionStorage.setItem("accessJWT", loginRes.jwts.accessJWT)
            localStorage.setItem("refreshJWT", loginRes.jwts.refreshJWT)

            // GET USER PROFILE

            const { status, message } = loginRes
            if (status === "success") {
                const user = await getUserProfile()
                // set userData into user redux if user have _id
                user.user?._id && dispatch(setUser(user.user))

            }

            // toast[status](message)

            // empty form fields after submitting form
            const initialFormData = loginFormFields.reduce((acc, input) => {
                acc[input.name] = '';
                return acc;
            }, {});
            setForm(initialFormData)
        } catch (error) {
            toast.error(error.message)
        }

    }


    if (showLoading) {
        return <div className='min-vh-100 d-flex justify-content-center align-items-center'>
            <Spinner animation="grow" />
        </div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center singin p-5 shadow-lg'>
            <Card >
                <Card.Body>
                    <Card.Title>Login Now</Card.Title>
                    <hr></hr>

                    <Form onSubmit={handleOnSubmit}>

                        {
                            loginFormFields.map((input) =>
                                <CustomeInputs key={input.name} {...input}
                                    value={form[input.name] || ''}
                                    onChange={handleOnChange}
                                ></CustomeInputs>
                            )
                        }

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div className="mt-2 text-end">
                            <Link to="/forgetpassword">Forgot Password?</Link>
                        </div>
                    </Form>


                </Card.Body>
            </Card></div>
    )
}

export default SignInPage