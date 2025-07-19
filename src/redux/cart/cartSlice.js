import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    items: []               // each item: { _id, title, author, quantity }
}

const cartSlice = createSlice({
    name: 'cartInfo',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const book = action.payload
            const existing = state.items.find(item => item._id === book._id)

            if (existing) {
                toast.warning(`${book.title} is already in cart`)
                return
            } else {
                state.items.push({ ...book, quantity: 1 })
                toast.success(`${book.title} is Added in Cart`)
            }
        },

        removeFromCart: (state, action) => {
            const bookId = action.payload       // should be the string ID, not an object
            state.items = state.items.filter(item => item._id !== bookId._id)
        },

        clearCart: state => {
            state.items = []
        }
    }
})

// === Selectors ===
// export const selectCartItems = state => state?.cart?.items

// export const selectCartCount = state =>
//     state?.cart?.items?.reduce((total, item) => total + item.quantity, 0)

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
