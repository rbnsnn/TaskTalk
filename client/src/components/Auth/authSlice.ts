import { createSlice } from '@reduxjs/toolkit'
import { storeTokens } from '../../helpers/auth/token-helper'
import { UserData } from '../../types/user-data.type'
import { authLogin } from './actions/loginAction'
import { modeChange } from './actions/modeAction'
import { authRegister } from './actions/registerAction'

interface AuthInterface {
    isLoggedIn: boolean
    loading: boolean
    error: string | null
    success?: boolean
    user: UserData
}

const initialAuthState: AuthInterface = {
    isLoggedIn: false,
    loading: false,
    error: null,
    user: {
        companyId: '',
        companyName: '',
        userId: '',
        username: '',
        email: '',
        roles: [],
        authToken: '',
        refreshToken: '',
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        retrieve(state, { payload }: any) {
            state.isLoggedIn = true
            state.user = {
                ...state.user,
                ...payload,
            }
        },
        update(state, { payload }: any) {
            state.user = {
                ...payload,
            }
        },
        removeErrAndSucc(state) {
            state.success = false
            state.error = null
        },
        logout: () => initialAuthState,
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(authLogin.fulfilled, (state, { payload }: any) => {
            storeTokens(payload)

            state.isLoggedIn = true
            state.loading = false
            state.error = null
            state.user = {
                ...state.user,
                ...payload,
            }
        })

        builder.addCase(authLogin.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        })

        builder.addCase(authRegister.pending, (state) => {
            state.loading = true
        })
        builder.addCase(authRegister.fulfilled, (state) => {
            state.loading = false
            state.error = null
            state.success = true
        })
        builder.addCase(authRegister.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
            state.success = false
        })
        builder.addCase(modeChange.pending, (state) => {
            state.loading = true
        })
        builder.addCase(modeChange.fulfilled, (state, { payload }) => {
            state.loading = false
            state.user = {
                ...state.user,
                colorMode: payload,
            }
        })
        builder.addCase(modeChange.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        })
    },
})

export const authActions = authSlice.actions
export default authSlice.reducer
