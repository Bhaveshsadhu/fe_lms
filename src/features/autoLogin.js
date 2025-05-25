import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../axio/axioHelper.js';
import { setUser } from '../redux/user/userSlice.js';


export const useAutoLogin = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userInfo);

    useEffect(() => {
        const autoLogin = async () => {
            const accessJWT = sessionStorage.getItem('accessJWT');
            const refreshJWT = localStorage.getItem('refreshJWT');
            console.log(accessJWT);

            if (accessJWT) {
                const userdata = await getUserProfile();
                console.log(userdata);
                if (userdata.user?._id) {
                    dispatch(setUser(userdata.user));
                    console.log(user)
                }
            }
        };

        autoLogin();
    }, [dispatch]);
};
