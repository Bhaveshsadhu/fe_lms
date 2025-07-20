import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import bookReducer from './books/bookSlice.js'
import cartReducer from './cart/cartSlice.js'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const cartPersistConfig = {
    key: 'cart',
    storage,
}

const rootReducer = combineReducers({
    cartInfo: persistReducer(cartPersistConfig, cartReducer),
    userInfo: userReducer,
    bookInfo: bookReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})

export const persistor = persistStore(store)
export default store