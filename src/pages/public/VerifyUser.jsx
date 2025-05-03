import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyFromEmailLink } from '../../axio/axioHelper';
import { toast } from 'react-toastify';

const VerifyUser = () => {
    const [searchParam] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParam.get('t');

    useEffect(() => {

        const verify = async () => {
            try {
                // alert("hellow world")
                // call api for token verification
                console.log(token)
                const isVerify = await verifyFromEmailLink(token);
                console.log(isVerify)
                const { status, message, result } = isVerify;
                toast[status](message);
                // store token in localstorage
                if (result) {
                    localStorage.setItem("UserInfo", result)
                }

                // redirect to dashboard
                navigate('/user-profile'); // Redirect to protected page
            } catch (error) {

            }
            if (token) {
                verify();
            }
        }
    }, [token, navigate])
    return (
        <div>Verifying User Please Wait......</div>
    )
}

export default VerifyUser