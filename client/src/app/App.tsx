import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredTokens } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const tokensData = retrieveStoredTokens()

        if (tokensData.authToken || tokensData.refreshToken) {
            dispatch(authActions.retrieve(tokensData))
        }

    }, [dispatch])

    return (
        <div className='App'>
            <CssBaseline />
            <AppRoutes />
        </div >
    );
}

export default App;
