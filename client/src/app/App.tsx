import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';


const App = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    return (
        <div className='App'>
            <CssBaseline />

            <Routes>
                {isLoggedIn &&
                    <Route path='/' element={<DashboardPage />}>
                        <Route path='*' element={<Navigate to='/' />} />
                    </Route>
                }

                {!isLoggedIn &&
                    <>
                        <Route path='/' element={<Navigate to='auth' />} />
                        <Route path='auth' element={<AuthPage />}>
                            <Route path='login' element={<LoginForm />} />
                            <Route path='register' element={<RegisterForm />} />
                            <Route path='*' element={<Navigate to='login' />} />
                        </Route>
                        <Route path='/*' element={<Navigate to='auth/login' />} />
                    </>
                }
            </Routes>

        </div >
    );
}

export default App;
