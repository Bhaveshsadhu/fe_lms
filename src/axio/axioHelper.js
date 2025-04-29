import axios from 'axios'
const APIEP = 'http://localhost:8000/api/v1/auth/';
const apiProcessor = ({ method, url, data }) => {
    return axios({
        method,
        url,
        data
    });

}
// USER REGISTRATION
export const userRegistration = async (data) => {
    const obj = {
        method: "post",
        url: APIEP + 'register',
        data
    }
    const res = await apiProcessor(obj)
    console.log(res)
}