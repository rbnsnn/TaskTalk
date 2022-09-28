import React, { useState } from 'react'
import { Box } from '@mui/material'
import AppMainBar from '../../components/Dashboard/AppMainBar/AppMainBar'
import AppDrawer from '../../components/Dashboard/AppDrawer/AppDrawer'
import AppContent from '../../components/Dashboard/AppContent/AppContent'
import { Outlet } from 'react-router-dom'


const AppPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <Box
            display='flex'
        >
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
        </Box>
    )
}

export default AppPage