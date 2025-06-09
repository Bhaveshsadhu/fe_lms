import { createSlice } from '@reduxjs/toolkit'

export const bookSlice = createSlice({
    name: 'bookInfo',
    initialState: {
        books: []
    },
    reducers: {
        setBook: (state, action) => {
            state.books = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setBook } = bookSlice.actions

export default bookSlice.reducer