import React from 'react'
import { Box } from '@mui/material'
import AppMainBar from '../../components/Dashboard/AppMainBar/AppMainBar'
import AppDrawer from '../../components/Dashboard/AppDrawer/AppDrawer'
import AppContent from '../../components/Dashboard/AppContent/AppContent'
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;
const AppPage: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppMainBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />

            <AppDrawer
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            <AppContent

            />

            <Outlet />
        </Box>
    )
}

export default AppPage