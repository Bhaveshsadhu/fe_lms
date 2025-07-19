import { Routes, Route } from "react-router-dom"
import {
    DashBoardPage,
    HomePage,
    SignInPage,
    SignUpPage,
    ForgetPasswordPage,
    UserProfile,
    AllUsers,
    UserLayout,
    Books,
    BorrowBooks,
    VerifyUser,
    ResetPassword,
    DefaultLayout,
    NewBookPage,
    EditBookPage,
    BookDetails,
    Cart

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
                <Route path="/reset-password" element={<ResetPassword></ResetPassword>} />
                <Route path="/book-details" element={<BookDetails></BookDetails>} />
                <Route path="/cart" element={<Cart></Cart>} />

            </Route>

            {/* Private Page */}
            <Route path="/user" element={<UserLayout />}>
                <Route index element={<DashBoardPage />} />
                <Route path="user-profile" element={<UserProfile></UserProfile>} />
                <Route path="user-alluser" element={<AllUsers></AllUsers>} />
                <Route path="books" element={<Books></Books>} />
                {/* <Route path="user-booksborrows" element={<BorrowBooks></BorrowBooks>} /> */}
                <Route path="books/add" element={<NewBookPage></NewBookPage>} />
                <Route path="books/borrow" element={<BorrowBooks></BorrowBooks>} />
                <Route path="books/edit" element={<EditBookPage></EditBookPage>} />

                {/* <Route path="books/borrow" element={<BorrowBooks></BorrowBooks>} /> */}

            </Route>
        </Routes>
    )
}

export default AppRoutes