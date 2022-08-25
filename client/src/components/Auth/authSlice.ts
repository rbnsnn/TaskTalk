import { createSlice } from "@reduxjs/toolkit";

interface AuthInterface {
    isLoggedIn: boolean,
    authToken: string,
    userRole: string
}

const initialAuthState: AuthInterface = {
    isLoggedIn: false,
    authToken: '',
    userRole: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            console.log('login')
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer