import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredTokens } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'
import { useApi } from '../hooks/useApi'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useApi('auth/userdata', 'GET')

    useEffect(() => {
        const getTokens = async () => {
            const tokensData = await retrieveStoredTokens()

            if ((tokensData.authToken || tokensData.refreshToken) && userData.data) {
                const userRetrievedData = {
                    ...userData.data,
                    ...tokensData,
                }
                await dispatch(authActions.retrieve(userRetrievedData))
            } else if (userData.error) {
                await dispatch(authActions.logout())
            }
        }
        getTokens()
    }, [dispatch, userData])

    return (
        <div className='App'>
            <CssBaseline />
            <AppRoutes />
        </div>
    )
}

export default App
