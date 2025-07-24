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
    VerifyUser,
    ResetPassword,
    DefaultLayout,
    NewBookPage,
    EditBookPage,
    BookDetails,
    Cart,
    BorrowHistory,
    SubmitReview,
    ManageMembers,
    BookRequestsPage,
    ReviewsApproval,
    ReportsPage,
    SettingsPage,
    ProceedToCheckout,
    ThankYouPage

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
                <Route path="/book-details/:slug" element={<BookDetails></BookDetails>} />
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
                {/* <Route path="books/borrow" element={<BorrowBooks></BorrowBooks>} /> */}
                <Route path="books/edit" element={<EditBookPage></EditBookPage>} />
                <Route path="borrow-history" element={<BorrowHistory></BorrowHistory>} />
                <Route path="submit-review" element={<SubmitReview></SubmitReview>} />
                <Route path="manage-members" element={<ManageMembers></ManageMembers>} />
                <Route path="book-requests" element={<BookRequestsPage></BookRequestsPage>} />
                <Route path="review-approval" element={<ReviewsApproval></ReviewsApproval>} />
                <Route path="reports" element={<ReportsPage></ReportsPage>} />
                <Route path="settings" element={<SettingsPage></SettingsPage>} />
                <Route path="checkout" element={<ProceedToCheckout></ProceedToCheckout>} />
                <Route path="thank-you" element={<ThankYouPage></ThankYouPage>} />



                {/* <Route path="books/borrow" element={<BorrowBooks></BorrowBooks>} /> */}

            </Route>
        </Routes>
    )
}

export default AppRoutes