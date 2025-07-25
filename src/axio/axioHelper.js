
import axios from 'axios'
import { toast } from 'react-toastify'
// const APIEP = 'http://localhost:8000/api/v1/auth';
// const USEREP = 'http://localhost:8000/api/v1/users';
const APIEP = import.meta.env.VITE_API_URL;
const USEREP = import.meta.env.VITE_API_URL_USEREP;
const API_BOOKS = import.meta.env.VITE_API_URL_BOOKS;

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
            // console.log("Access JWT:", getAccessJWT());
            // console.log("refreshJWT:", getRefreshJWT());
            headers.authorization = "Bearer " + token
            // console.log(token)
        }

        const pendingRequest = axios({
            method,
            url,
            data: payLoad,
            headers
        });

        if (showToast) {
            toast.promise(pendingRequest, {
                pending: 'Loading Please Wait...',
            });
        }
        const { data } = await pendingRequest;
        showToast === true && toast[data.status](data.message);
        return data;
    } catch (error) {
        // toast.error(error.response?.data?.message || 'API Request failed');
        if (showToast) {
            toast.error(error.response?.data?.message || error.message || 'API Request failed');
            return {
                status: 'error',
                message: error.response?.data?.message || error.message,
            };
        }
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
        return result;
    } catch (error) {
        // console.log(error.message)
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

// LOGOUT
export const logoutUser = async () => {
    try {
        const obj = {
            method: "GET",
            url: APIEP + '/logout',
            isPrivateCall: true,
            showToast: true,
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}

// FORGET PASSWORD
export const forgotPassword = async (payLoad) => {
    try {

        const obj = {
            method: "POST",
            url: USEREP + '/forget-password',
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
// RESET PASSWORD 
export const resetPassword = async (payLoad) => {
    try {

        const obj = {
            method: "POST",
            url: USEREP + '/reset-password',
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
// SET NEW PASSWORD 
export const setNewPassword = async (payLoad) => {
    try {

        const obj = {
            method: "POST",
            url: USEREP + '/setNewPassword',
            payLoad,
            isPrivateCall: true,
            showToast: true
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}

// BOOK CRUD - ADD NEW BOOK
export const addNewBook = async (payLoad) => {
    try {
        const obj = {
            method: "POST",
            url: API_BOOKS,
            payLoad,
            isPrivateCall: true,
            showToast: true
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}
// BOOK CRUD - ADD NEW BOOK
//Get all books - IF ROLE=ADMIN GET ALL BOOKS, IF ROLE=USER GET ONLY AVAILABLE BOOKS
export const getBooks = async () => {
    try {
        const obj = {
            method: "GET",
            url: API_BOOKS,
            isPrivateCall: true,
            showToast: true
        }
        const result = await apiProcessor(obj)
        // console.log(result)
        return result;
    } catch (error) {
        return error.message
    }

}
// GET all books to display
export const getAllBooksToDisplay = async () => {
    try {
        const obj = {
            method: "GET",
            url: API_BOOKS + "/getdisplaybooks",
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
// UPDATE BOOK BY ID
export const updateBookByID = async (payLoad) => {
    try {
        const obj = {
            method: "PUT",
            url: API_BOOKS,
            isPrivateCall: true,
            payLoad,
            showToast: true
        }
        const result = await apiProcessor(obj)
        return result;
    } catch (error) {
        return error.message
    }

}

// delete book by id
export const deleteBookByID = async (payLoad) => {
    try {
        console.log(payLoad)
        const obj = {
            method: "DELETE",
            url: API_BOOKS + "/" + payLoad,
            isPrivateCall: true,
            showToast: false
        }
        const result = await apiProcessor(obj)
        return result;
    } catch (error) {
        return error.message
    }

}

// Delete an uploaded image file from a book
export const deleteUploadedImage = async (id, payLoad) => {
    try {
        const obj = {
            method: "DELETE",
            url: API_BOOKS + "/" + id + "/uploaded-file",
            isPrivateCall: true,
            payLoad,
            showToast: false
        }
        // console.log(obj)

        const result = await apiProcessor(obj)
        return result;
    } catch (error) {
        return error.message
    }

}

// Borrow Books
export const borrowBooks = async (payLoad) => {
    try {
        const obj = {
            method: "POST",
            url: API_BOOKS + "/borrow",
            isPrivateCall: true,
            payLoad,
            showToast: false
        }
        // console.log(obj)

        const result = await apiProcessor(obj)
        return result;
    } catch (error) {
        return error.message
    }

} 