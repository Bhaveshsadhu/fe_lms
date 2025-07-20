import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    items: []
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
        increaseQuantity: (state, action) => {
            const bookId = action.payload
            const item = state.items.find(i => i._id === bookId)
            if (!item) return

            const currentQty = parseInt(item.quantity, 10)
            const maxQty = parseInt(item.availableQuantity, 10)

            if (currentQty >= maxQty) {
                toast.warning("You've reached the maximum available quantity")
            } else {
                item.quantity = currentQty + 1
            }
        },
        decreaseQuantity: (state, action) => {
            const bookId = action.payload
            const item = state.items.find(i => i._id === bookId)
            if (!item) return

            const currentQty = parseInt(item.quantity, 10)

            if (currentQty <= 1) {
                // remove when quantity would go to zero
                state.items = state.items.filter(i => i._id !== bookId)
                toast.info(`${item.title} removed from cart`)
            } else {
                item.quantity = currentQty - 1
            }
        },

        removeFromCart: (state, action) => {
            const bookId = action.payload
            state.items = state.items.filter(item => item._id !== bookId)
            toast.info("Item removed from cart")
        },

        clearCart: state => {
            state.items = []
            toast.info("Cart cleared")
        }
    }
})

// === Selectors ===
export const selectCartItems = state => state?.cart?.items

export const selectCartCount = state =>
    state?.cart?.items?.reduce((total, item) => total + item.quantity, 0)

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer
