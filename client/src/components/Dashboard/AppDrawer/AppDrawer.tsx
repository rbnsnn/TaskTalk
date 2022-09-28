import React from 'react'
import Box from '@mui/material/Box'
import AppDrawerDesktop from './AppDrawerDesktop'
import AppDrawerMobile from './AppDrawerMobile'

interface Props {
    drawerWidth: number
    mobileOpen: boolean
    handleDrawerToggle: () => void
}
const AppDrawer: React.FC<Props> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {

    return (
        <Box
            component='nav'
            aria-label='menu'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <AppDrawerDesktop drawerWidth={drawerWidth} />
            <AppDrawerMobile drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        </Box>
    )
}

export default AppDrawer