import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredTokens } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'
import { useApi } from '../hooks/useApi'
import AppLoading from './AppLoading'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const { data, error } = useApi('auth/userdata', 'GET')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        const getTokens = async () => {
            const tokensData = await retrieveStoredTokens()

            if ((tokensData.authToken || tokensData.refreshToken) && data) {
                setLoading(true)
                const userRetrievedData = {
                    ...data,
                    ...tokensData,
                }
                await dispatch(authActions.retrieve(userRetrievedData))
                setLoading(false)
            } else if (error) {
                await dispatch(authActions.logout())
                setLoading(false)
            }
        }
        getTokens()
    }, [dispatch, data, error])

    return (
        <div className='App'>
            <CssBaseline />
            {!loading && <AppRoutes />}
            {loading && <AppLoading />}
        </div>
    )
}

export default App
