import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';


const App = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    return (
        <div className='App'>
            <CssBaseline />

            <Routes>
                <Route path='/' element={isLoggedIn ? <Navigate to='dashboard' replace /> : <Navigate to='auth/login' replace />} />
                <Route path='auth' element={<Navigate to='login' />} />
                <Route path='auth/*' element={<AuthPage />} />
                {isLoggedIn ?
                    <>
                        <Route path='dashboard'>
                            <Route index element={<DashboardPage />} />
                            <Route path='profile' element={<ProfilePage />} />
                        </Route>
                        <Route path='*' element={<Navigate to='dashboard' />} />
                    </>
                    : <Route path='*' element={<Navigate to='auth/login' />} />}

            </Routes>
        </div >
    );
}

export default App;
