import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux-hooks'
import { RootState } from '../store/store'
import { useRole } from '../hooks/useRole'
import { Role } from '../types/roles-enum.type'
import AppPage from '../pages/App/AppPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import LogoutPage from '../pages/Auth/LogoutPage'
import DashBoardPage from '../pages/App/DashboardPage'
import UsersTablePage from '../pages/App/UsersTablePage'
import TasksBoardPage from '../pages/App/TasksBoardPage'
import TaskDetailPage from '../pages/App/TaskDetailPage'
import TasksTablePage from '../pages/App/TasksTablePage'
import LabelsPage from '../pages/App/LabelsPage'

const AppRoutes: React.FC = () => {
    const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn)
    const admin = useRole(Role.ADMIN)
    const moderator = useRole(Role.MODERATOR)
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
                            element={<TasksBoardPage />}
                        />
                        <Route
                            path='tasks'
                            element={<TasksTablePage />}
                        />
                        {moderator && (
                            <Route
                                path='labels'
                                element={<LabelsPage />}
                            />
                        )}
                        {admin && (
                            <Route
                                path='users'
                                element={<UsersTablePage />}
                            />
                        )}
                        <Route
                            path='task/:taskId'
                            element={<TaskDetailPage />}
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
