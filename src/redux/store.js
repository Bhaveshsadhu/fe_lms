import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import bookReducer from './books/bookSlice.js'
import cartReducer from './cart/cartSlice.js'




export default configureStore({
    reducer: {
        userInfo: userReducer,
        bookInfo: bookReducer,
        cartInfo: cartReducer,
    },
})