import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
    const { user } = useSelector((state) => state.userInfo)
    const isAuth = user?._id;
    return (
        isAuth ? children : <Navigate to="/login"></Navigate>

    )
}

export default AuthRoutes