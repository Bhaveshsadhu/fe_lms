import axios from 'axios'
import { toast } from 'react-toastify'
const APIEP = 'http://localhost:8000/api/v1/auth';
const USEREP = 'http://localhost:8000/api/v1/users';

const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}
const getRefreshJWT = () => {
    return localStorage.getItem("refreshJWT")
}

const apiProcessor = async ({ method, url, payLoad, isPrivateCall, showToast, isrefreshJWT }) => {
    try {
        const headers = {}

        if (isPrivateCall) {
            // headers.authorization = "Bearer " + getAccessJWT()
            const token = isrefreshJWT ? getRefreshJWT() : getAccessJWT()
            headers.authorization = "Bearer " + token
            // console.log(token)
        }

        const penndigResult = axios({
            method,
            url,
            data: payLoad,
            headers
        });

        if (showToast) {
            toast.promise(penndigResult, {
                pending: 'Loading Please Wait...',
            });
        }
        const { data } = await penndigResult;
        showToast === true && toast[data.status](data.message);
        return data;
    } catch (error) {
        toast.error(error.response?.data?.message || 'API Request failed');
    }
}
// USER REGISTRATION
export const userRegistration = async (payLoad) => {
    try {

        const obj = {
            method: "POST",
            url: APIEP + '/register',
            payLoad,
            isPrivateCall: false,
            showToast: true

        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}

// USER VERIFY FROM EMAIL
export const verifyFromEmailLink = async (payLoad) => {
    try {
        const obj = {
            method: "POST",
            url: APIEP + '/activate-user',
            payLoad,
            isPrivateCall: false,
            showToast: true
        }
        const result = await apiProcessor(obj);
        return result;
    } catch (error) {
        return error.message;
    }
};

// USER Login
export const userLogin = async (payLoad) => {
    try {

        const obj = {
            method: "POST",
            url: APIEP + '/login',
            payLoad,
            isPrivateCall: false,
            showToast: true
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}
// GET USER PROFILE
export const getUserProfile = async () => {
    try {
        const obj = {
            method: "GET",
            url: USEREP + '/profile',
            isPrivateCall: true,
            showToast: false
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}

// RENEW ACCESSJWT FROM REFRESHJWT
export const renewAccessJWT = async () => {
    try {
        const obj = {
            method: "GET",
            url: APIEP + '/renew-jwt',
            isPrivateCall: true,
            showToast: false,
            isrefreshJWT: true
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}
