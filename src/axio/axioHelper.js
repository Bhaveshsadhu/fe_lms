import axios from 'axios'
import { toast } from 'react-toastify'
const APIEP = 'http://localhost:8000/api/v1/auth';

const apiProcessor = async ({ method, url, payLoad }) => {
    try {
        const penndigResult = axios({
            method,
            url,
            data: payLoad
        });
        toast.promise(penndigResult, {
            pending: 'Loading Please Wait...',
        });
        const { data } = await penndigResult;
        toast[data.status](data.message);
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
            payLoad
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
            url: APIEP + '/verify',
            payLoad
        }
        const result = await apiProcessor(obj);
        return result;
    } catch (error) {
        return error.message;
    }
};