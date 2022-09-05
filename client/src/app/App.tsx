import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

import AuthPage from '../pages/AuthPage';

function App() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    return (
        <div className='App'>
            <CssBaseline />

            <Routes>
                <Route path='/' element={isLoggedIn ? <p>HomePage</p> : <Navigate to='login' replace />} />
                <Route path='login' element={<AuthPage />} />
            </Routes>
        </div>
    );
}

export default App;
