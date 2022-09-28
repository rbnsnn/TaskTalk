import React from 'react'
import Drawer from '@mui/material/Drawer'
import AppDrawerContent from './AppDrawerContent'
import { DRAWER_WIDTH } from '../../../theme/drawerWidth'


interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppDrawerMobile: React.FC<Props> = ({ drawerOpen: mobileOpen, handleDrawerToggle }) => {

    return (
        <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
            }}
        >

            {<AppDrawerContent drawerOpen={mobileOpen} />}
        </Drawer>
    )
}

export default AppDrawerMobile