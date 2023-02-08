import React from 'react'
import { Box, Drawer } from '@mui/material'
import { DRAWER_WIDTH } from '../../../themes/drawerWidth'
import AppDrawerContent from './AppDrawerContent'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppDrawerMobile: React.FC<Props> = ({
    drawerOpen: mobileOpen,
    handleDrawerToggle,
}) => {
    return (
        <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
            }}
        >
            <Box onClick={handleDrawerToggle}>
                {
                    <AppDrawerContent
                        drawerOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                }
            </Box>
        </Drawer>
    )
}

export default AppDrawerMobile
