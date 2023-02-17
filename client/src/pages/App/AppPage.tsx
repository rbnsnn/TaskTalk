import React, { useState, useEffect, useCallback } from 'react'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'
import { SocketContext } from '../../helpers/socket/socket-context'
import { Outlet } from 'react-router-dom'
import AppMainBar from '../../components/Dashboard/AppMainBar/AppMainBar'
import AppDrawer from '../../components/Dashboard/AppDrawer/AppDrawer'
import AppContent from '../../components/Dashboard/AppContent/AppContent'
import io from 'socket.io-client'
import { authActions } from '../../components/Auth/authSlice'

const AppPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const dispatch = useAppDispatch()
    const { username, userId, companyId } = useAppSelector(
        (state: RootState) => state.auth.user
    )

    const socket = io(`${process.env.REACT_APP_SERVER_URL as string}`)
    socket.auth = {
        username,
        userId,
        companyId,
    }
    const handleDrawerToggle = useCallback(() => {
        setDrawerOpen(!drawerOpen)
    }, [drawerOpen])

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join_room', companyId)
        })
        socket.on('disconnect', () => {
            socket.emit('leave_room')
        })
        socket.on('update_user', (data: any) => {
            // dispatch(authActions.update(data))
            console.log('user')
        })
        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [socket, companyId])
    return (
        <Box display='flex'>
            <SocketContext.Provider value={socket}>
                <AppDrawer
                    drawerOpen={drawerOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />

                <AppMainBar
                    drawerOpen={drawerOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />

                <AppContent>
                    <Outlet />
                </AppContent>
            </SocketContext.Provider>
        </Box>
    )
}

export default AppPage
