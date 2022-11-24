import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import AppMainBar from '../../components/Dashboard/AppMainBar/AppMainBar'
import AppDrawer from '../../components/Dashboard/AppDrawer/AppDrawer'
import AppContent from '../../components/Dashboard/AppContent/AppContent'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'

const socket = io(`${process.env.REACT_APP_SERVER_URL as string}`)

const AppPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { username, userId } = useAppSelector((state: RootState) => state.auth.user)

    socket.auth = {
        username,
        userId,
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    useEffect(() => {
        console.log(socket.auth)
        socket.on('connect', () => {
            console.log('connected')
            console.log(socket.auth)
        })

        socket.on('disconnect', () => {
            console.log('disconnect')
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])
    return (
        <Box display='flex'>
            <AppDrawer
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            <AppMainBar
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            <AppContent>
                <Outlet context={socket} />
            </AppContent>
        </Box>
    )
}

export default AppPage
