import React from 'react';
import Drawer from '@mui/material/Drawer';
import AppDrawerContent from './AppDrawerContent';

interface Props {
    drawerWidth: number
}

const AppDrawerDesktop: React.FC<Props> = ({ drawerWidth }) => {

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            {<AppDrawerContent />}
        </Drawer>
    )
}

export default AppDrawerDesktop
