import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'
import AppPage from '../pages/App/AppPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import LogoutPage from '../pages/Auth/LogoutPage'
import DashBoardPage from '../pages/App/DashboardPage'
import UsersPage from '../pages/App/UsersPage'
import TasksBoard from '../pages/App/TasksBoardPage'
import { RootState } from '../store/store'
import TaskPage from '../pages/App/TaskPage'
import TasksTablePage from '../pages/App/TasksTablePage'

const AppRoutes: React.FC = () => {
    const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn)
    return (
        <Routes>
            {isLoggedIn && (
                <>
                    <Route
                        path='/'
                        element={<AppPage />}
                    >
                        <Route
                            index
                            element={<Navigate to='dashboard' />}
                        />
                        <Route
                            path='dashboard'
                            element={<DashBoardPage />}
                        />
                        <Route
                            path='board'
                            element={<TasksBoard />}
                        />
                        <Route
                            path='tasks'
                            element={<TasksTablePage />}
                        />
                        <Route
                            path='users'
                            element={<UsersPage />}
                        />
                        <Route
                            path='task/:taskId'
                            element={<TaskPage />}
                        />
                    </Route>
                    <Route
                        path='logout'
                        element={<LogoutPage />}
                    />
                    <Route
                        path='/*'
                        element={<Navigate to='/' />}
                    />
                </>
            )}

            {!isLoggedIn && (
                <>
                    <Route
                        path='/'
                        element={<Navigate to='login' />}
                    />
                    <Route
                        path='login'
                        element={<LoginPage />}
                    />
                    <Route
                        path='register'
                        element={<RegisterPage />}
                    />
                    <Route
                        path='/*'
                        element={<Navigate to='login' />}
                    />
                </>
            )}
        </Routes>
    )
}

export default AppRoutes
