import React from 'react'
import { Routes, Route } from "react-router-dom"
import {
    DashBoardPage,
    HomePage,
    DefaultLayout,
    SignInPage,
    SignUpPage,
    ForgetPasswordPage,
    UserProfile,
    AllUsers,
    UserLayout,
    Books,
    BorrowBooks,
    VerifyUser

} from "@pages/index"



const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage></HomePage>} />
                <Route path="/login" element={<SignInPage></SignInPage>} />
                <Route path="/signup" element={<SignUpPage></SignUpPage>} />
                <Route path="/forgetpassword" element={<ForgetPasswordPage></ForgetPasswordPage>} />
                <Route path="/activate-user" element={<VerifyUser></VerifyUser>} />

            </Route>

            {/* Private Page */}
            <Route path="/user" element={<UserLayout />}>
                <Route index element={<DashBoardPage />} />
                <Route path="user-profile" element={<UserProfile></UserProfile>} />
                <Route path="user-alluser" element={<AllUsers></AllUsers>} />
                <Route path="user-books" element={<Books></Books>} />
                <Route path="user-booksborrows" element={<BorrowBooks></BorrowBooks>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes