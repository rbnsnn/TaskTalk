import React from 'react'
import Box from '@mui/material/Box'
import AppDrawerDesktop from './AppDrawerDesktop'
import AppDrawerMobile from './AppDrawerMobile'


interface Props {
    handleDrawerToggle: () => void
    drawerOpen: boolean
}
const AppDrawer: React.FC<Props> = ({ handleDrawerToggle, drawerOpen }) => {

    return (
        <Box
            component='nav'
            aria-label='menu'
        >
            <AppDrawerDesktop drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
            <AppDrawerMobile drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

        </Box>
    )
}

export default AppDrawer