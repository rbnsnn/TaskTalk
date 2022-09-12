import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredToken } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    const tokenData = retrieveStoredToken()

    if (tokenData) {
        dispatch(authActions.retrieve(tokenData))
    }

    useEffect(() => {

        if (tokenData) {
            const logoutTimeout = setTimeout(() => {
                dispatch(authActions.logout())
            }, tokenData.expiration)

            return () => clearTimeout(logoutTimeout)
        }
    }, [dispatch, tokenData])
    return (
        <div className='App'>
            <CssBaseline />
            <AppRoutes />
        </div >
    );
}

export default App;
