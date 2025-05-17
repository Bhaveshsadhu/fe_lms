import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../../components/CustomeInputs';
import { signUpInputes } from '../../assets/customeInputes/userSingUpFormFields';
import useForm from '../../hooks/useForm.js';
import { userRegistration } from '../../axio/axioHelper.js';
import { validatePassword } from '../../services/validatePassword.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const initialState = {}
const SignUpPage = () => {
    const { form, setForm, handleOnChange } = useForm(initialState);
    const navigate = useNavigate();
    // const initialFormData = signUpInputes.reduce((acc, curr) => {
    //     acc[curr.name] = '';
    //     return acc;
    // }, {});
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            // console.log(form);
            const { confirmpassword, ...rest } = form
            if (!validatePassword(rest.password)) {
                toast.error("Password must contain 8 characters including uppercase, lowercase, number, and special symbol.");
                return;
            }
            if (confirmpassword != rest.password) {
                toast.error("Password dose not Matched with confirm Password")
                return;
            }

            const { url } = await userRegistration(rest);

            // empty form fields after submitting form
            const initialFormData = signUpInputes.reduce((acc, input) => {
                acc[input.name] = '';
                return acc;
            }, {});
            setForm(initialFormData)
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <div className='d-flex justify-content-center'>
            <Form style={{ width: "450px" }} className='card p-5 mt-5 shadow-lg'
                onSubmit={handleOnSubmit}>
                <h1>Join our Library Community</h1>

                {
                    signUpInputes.map((input) =>
                        <CustomeInputs key={input.name} {...input}
                            value={form[input.name] || ''}
                            onChange={handleOnChange}
                        ></CustomeInputs>
                    )
                }

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    )
}

export default SignUpPage