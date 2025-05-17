import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyFromEmailLink } from '../../axio/axioHelper';
import { toast } from 'react-toastify';
import { Alert } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';

const VerifyUser = () => {
    const [searchParam] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParam.get('t');
    const sessionId = searchParam.get('sessionId')


    useEffect(() => {

        const verify = async () => {
            try {
                const isVerify = await verifyFromEmailLink({ token, sessionId });

                const { status, message, result } = isVerify;
                toast[status](message);


                // redirect to dashboard
                navigate('/login');
            } catch (error) {
                toast.error(error.message)
            }


        }
        // simpley returen if for double call and token is not found
        if (token && sessionId) {
            verify();
        }
        else {
            toast.error("Not Valid URL")
            return;
        }
    }, [sessionId, token])
    return (

        <Alert className="p-3 m-5" variant="danger">Verifying User Please Wait......</Alert>

    )
}

export default VerifyUser