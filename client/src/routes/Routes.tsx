import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import LogoutPage from '../pages/Auth/LogoutPage'


const AppRoutes: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    return (
        <Routes>
            {isLoggedIn &&
                <>
                    <Route path='/' element={<Navigate to='dashboard' />} />
                    <Route path='dashboard' element={<DashboardPage />}>
                        <Route path='test' element={<p>test</p>} />
                    </Route>
                    <Route path='logout' element={<LogoutPage />} />
                    <Route path='/*' element={<Navigate to='/' />} />
                </>
            }

            {!isLoggedIn &&
                <>
                    <Route path='/' element={<Navigate to='login' />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route path='/*' element={<Navigate to='login' />} />
                </>
            }
        </Routes>
    );
}

export default AppRoutes;
