import { createSlice } from "@reduxjs/toolkit";

interface AuthInterface {
    isLoggedIn: boolean,
    authToken: string | null,
    userRole: string | null
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
        login(state, payload: any) {
            console.log('login')
            state.isLoggedIn = true
            state.authToken = payload.authToken
            state.userRole = payload.userRole
        },
        logout(state) {
            state.isLoggedIn = false
            state.authToken = null
            state.userRole = null
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer