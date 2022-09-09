import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/Auth/authSlice'
import { tokenMiddleware } from '../middlewares/token-middleware';

export const store = configureStore({
    reducer: {
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch