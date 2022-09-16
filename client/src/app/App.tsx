import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredTokens } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'
import { useApi } from '../hooks/useApi'
import { useState } from 'react'

const App: React.FC = () => {
    const [test, setTest] = useState()

    const data = useApi('/auth/userinfo', 'GET')
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data !== null) {
            setTest(data!)
            console.log(test)
        }
        const tokenData = retrieveStoredTokens()
        dispatch(authActions.retrieve(tokenData))

    }, [dispatch])

    return (
        <div className='App'>
            <CssBaseline />
            <AppRoutes />
        </div >
    );
}

export default App;
