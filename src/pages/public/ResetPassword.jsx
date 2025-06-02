import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { resetPassword, setNewPassword } from '../../axio/axioHelper';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import useForm from '@hooks/useForm';
import { CustomeInputs } from '@components/CustomeInputs';
import { resetPasswordFields } from '../../assets/customeInputes/resetPasswordFields';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { validatePassword } from '../../services/validatePassword';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isVerified, setIsVerified] = useState(false)
    const { form, handleOnChange, setForm } = useForm({});
    const [showLoading, setShowLoading] = useState(true)
    useEffect(() => {
        const verifyToken = async () => {
            const result = await resetPassword({ token });
            console.log(token)

            if (result?.status === "success") {
                sessionStorage.setItem("accessJWT", token)
                setIsVerified(true);
            }
        };

        if (token) {
            verifyToken();
            // if token found then it may take 2 sec to fetch data so we show loader for 2 sec
            if (token) {
                setTimeout(() => { setShowLoading(false) }, 2000)
            }
            else {
                // if token not found then immdiately show the login page NO-WAIT
                setShowLoading(false)
            }
        }
    }, [token]); // Only re-run if token changes

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = form
        if (password === confirmPassword) {
            if (!validatePassword(password)) {
                toast.error("Password must contain 8 characters including uppercase, lowercase, number, and special symbol.");
                return;
            }
            else {
                const { status, message } = await setNewPassword({
                    password
                })
                console.log(status, message)
                toast[status](message)
                // toast[status](message)
            }
        }
        else {
            toast.error("Password Does not Match with Confirm password")
        }
    }

    if (showLoading) {
        return <div className='min-vh-100 d-flex justify-content-center align-items-center'>
            <Spinner animation="grow" />
        </div>;
    }
    return (
        <>
            {isVerified ? (
                <div className='d-flex justify-content-center align-items-center singin p-5 mt-5 shadow-lg'>
                    <Card style={{ width: '25rem' }}>
                        <Card.Body>
                            <Card.Title className="text-center">Reset Your Password?</Card.Title>
                            <hr />
                            <p className="text-center mb-4">
                                Enter Your New password.
                            </p>
                            <Form onSubmit={handleOnSubmit}>
                                {resetPasswordFields.map((input) => {
                                    return (
                                        <CustomeInputs
                                            key={input.name}
                                            {...input}
                                            value={form[input.name] || ''}
                                            onChange={handleOnChange}
                                        />
                                    );
                                })}

                                {/* <CustomeInputs
                                    {...resetPasswordFields}
                                    value={form[resetPasswordFields.name] || ''}
                                    onChange={handleOnChange}
                                /> */}
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <div className='vh-100 d-flex justify-content-center align-items-center'>
                    <Alert key="danger" variant="danger">
                        Your token has expired. Please reset your password again using the same email.
                    </Alert>
                </div>


            )}
        </>
    );

}

export default ResetPassword