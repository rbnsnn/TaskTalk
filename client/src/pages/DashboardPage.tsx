import React from 'react'
import { Box } from '@mui/material'
import AppMainBar from '../components/Dashboard/AppMainBar/AppMainBar'
import AppDrawer from '../components/Dashboard/Drawer/AppDrawer'

const drawerWidth = 240;
const DashboardPage: React.FC = () => {
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

            <AppDrawer drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </Box>
    )
}

export default DashboardPage