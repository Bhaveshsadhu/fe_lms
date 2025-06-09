import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
    const { user } = useSelector((state) => state.userInfo)
    const location = useLocation();
    // console.log(location)
    const isAuth = user?._id;
    return (
        isAuth ? children : <Navigate state={{ from: location.pathname }} to="/login"></Navigate>

    )
}

export default AuthRoutes