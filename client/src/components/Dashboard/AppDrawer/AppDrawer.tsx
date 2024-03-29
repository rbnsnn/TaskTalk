import React from 'react'
import { Box } from '@mui/material'
import AppDrawerDesktop from './AppDrawerDesktop'
import AppDrawerMobile from './AppDrawerMobile'

interface Props {
    handleDrawerToggle: () => void
    drawerOpen: boolean
}
const AppDrawer: React.FC<Props> = ({ handleDrawerToggle, drawerOpen }) => {
    return (
        <Box component='nav'>
            <AppDrawerDesktop
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <AppDrawerMobile
                drawerOpen={drawerOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </Box>
    )
}

export default AppDrawer
