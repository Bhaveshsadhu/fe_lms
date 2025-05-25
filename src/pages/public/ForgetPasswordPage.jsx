import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CustomeInputs } from '../../components/CustomeInputs';
import useForm from '../../hooks/useForm';
import { toast } from 'react-toastify';
// import { forgotPassword } from '../../axio/axioHelper';

const ForgetPasswordPage = () => {
    const { form, handleOnChange, setForm } = useForm({});

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { email } = form;
        if (email) {
            try {
                const result = await forgotPassword({ email });
                if (result && result.status === 'success') {
                    toast.success(result.message || "Password reset email sent successfully!");
                    setForm({});
                } else {
                    toast.error(result.message || "Failed to send password reset email. Please try again.");
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again later.");
                console.error("Forgot Password Error:", error); // For debugging
            }
        } else {
            toast.error("Please enter your email address.");
        }
    };

    const emailField = {
        label: "Email address",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
    };

    return (
        <div className='d-flex justify-content-center align-items-center singin p-5 mt-5 shadow-lg'>
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Forgot Your Password?</Card.Title>
                    <hr />
                    <p className="text-center mb-4">
                        Enter your email address below and we'll send you a link to reset your password.
                    </p>
                    <Form onSubmit={handleOnSubmit}>
                        <CustomeInputs
                            {...emailField}
                            value={form[emailField.name] || ''}
                            onChange={handleOnChange}
                        />

                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ForgetPasswordPage;