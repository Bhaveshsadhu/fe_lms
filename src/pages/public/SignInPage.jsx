import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { loginFormFields } from '../../assets/customeInputes/loginFormFields.js';
import { CustomeInputs } from '../../components/CustomeInputs';
import useForm from '../../hooks/useForm.js';
import { toast } from 'react-toastify';
import { getUserProfile, userLogin } from '../../axio/axioHelper.js';
import { validatePassword } from '../../services/validatePassword.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/user/userSlice.js';
import { useAutoLogin } from '../../features/autoLogin.js';
// import { autoLogin } from '../../features/autoLogin.js';
const initialState = {}
const SignInPage = () => {
    const { form, setForm, handleOnChange } = useForm(initialState);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userInfo)
    const navigate = useNavigate()
    // const autologinfunc = async () => await autoLogin()
    useEffect(() => {
        user?._id ? navigate('/user') : useAutoLogin()
    }, [user?._id, navigate, useAutoLogin])
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
    return (
        <div className='d-flex justify-content-center align-items-center singin p-5 mt-5 shadow-lg'>
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