import React from 'react';
import Drawer from '@mui/material/Drawer';
import AppDrawerContent from './AppDrawerContent';

interface Props {
    drawerWidth: number
    mobileOpen: boolean
    handleDrawerToggle: () => void
}
const AppDrawerMobile: React.FC<Props> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {

    return (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >

            {<AppDrawerContent />}
        </Drawer>
    )
}

export default AppDrawerMobile