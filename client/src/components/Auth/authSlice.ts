import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../types/user-data.type";
import { authLogin } from "./actions/loginAction";
import { authRegister } from "./actions/registerAction";

interface AuthInterface {
    isLoggedIn: boolean,
    loading: boolean,
    error: string | null,
    success?: boolean,
    user: UserData
}

const initialAuthState: AuthInterface = {
    isLoggedIn: false,
    loading: false,
    error: null,
    user: {
        userId: '',
        username: '',
        email: '',
        roles: [],
        authToken: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        removeErrAndSucc(state) {
            state.success = false
            state.error = null
        },
        logout(state) {
            state = initialAuthState
        },

    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(authLogin.fulfilled, (state, { payload }) => {
            state.isLoggedIn = true
            state.loading = false
            state.error = null
            state.user = {
                ...state.user,
                authToken: payload
            }
        })

        builder.addCase(authLogin.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        })

        builder.addCase(authRegister.pending, (state) => {
            state.loading = true
        })
        builder.addCase(authRegister.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = null
            state.success = true
        })
        builder.addCase(authRegister.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        })
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer