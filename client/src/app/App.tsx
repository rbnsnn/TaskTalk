import React, { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import AppRoutes from '../routes/Routes'
import { retrieveStoredTokens } from '../helpers/auth/token-helper'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'
import { axiosInstance } from '../helpers/axios/axios-interceptor-helper'
import axios from 'axios'

const App: React.FC = () => {

    var data = '';

    var config = {
        method: 'post',
        url: 'http://localhost:5000/auth/refresh',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiJNV0JQNmlUdWxvIiwiaWF0IjoxNjYzMjc0MzQ0LCJleHAiOjE2NjMyODg3NDR9.c3SGwSwbIUroiaYJM0VGqHNqXJ5OblF2WS36rUieCaA'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    const dispatch = useAppDispatch()

    useEffect(() => {
        const tokenData = retrieveStoredTokens()
        dispatch(authActions.retrieve(tokenData))
    }, [])

    return (
        <div className='App'>
            <CssBaseline />
            <AppRoutes />
        </div >
    );
}

export default App;
