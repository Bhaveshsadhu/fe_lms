import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../../components/CustomeInputs';
import { signUpInputes } from '../../assets/customeInputes/userSingUpFormFields';
import useForm from '../../hooks/useForm.js';
import { userRegistration } from '../../axio/axioHelper.js';
const initialState = {}
const SignUpPage = () => {
    const { form, setForm, handleOnChange } = useForm(initialState);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        const result = userRegistration(form);
        console.log(result);

    }
    return (
        <div className='d-flex justify-content-center'>
            <Form style={{ width: "450px" }} className='card p-5 mt-5 shadow-lg'
                onSubmit={handleOnSubmit}>
                <h1>Join our Library Community</h1>

                {
                    signUpInputes.map((input) =>
                        <CustomeInputs key={input.name} {...input}
                            onChange={handleOnChange}
                        ></CustomeInputs>
                    )
                }

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUpPage