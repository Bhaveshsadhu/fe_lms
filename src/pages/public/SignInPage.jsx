import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { loginFormFields } from '../../assets/customeInputes/loginFormFields.js';
import { CustomeInputs } from '../../components/CustomeInputs';
import useForm from '../../hooks/useForm.js';
import { toast } from 'react-toastify';
import { userLogin } from '../../axio/axioHelper.js';
import { validatePassword } from '../../services/validatePassword.js';
const initialState = {}
const SignInPage = () => {
    const { form, setForm, handleOnChange } = useForm(initialState);
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
            sessionStorage.setItem("accessJWT", loginRes.jwts.accessJWT)
            localStorage.setItem("refreshJWT", loginRes.jwts.refreshJWT)

            console.log(loginRes)
            const { status, message } = loginRes

            toast[status](message)

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