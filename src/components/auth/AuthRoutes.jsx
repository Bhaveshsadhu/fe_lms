import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
    const isAuth = true;
    return (
        isAuth ? children : <Navigate to="/login"></Navigate>

    )
}

export default AuthRoutes