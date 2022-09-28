import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from './AppBarStyled'
import AppBarContent from './AppBarContent'


interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppBarDesktop: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <Box>
            <AppBar
                position='fixed'
                open={drawerOpen}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <AppBarContent handleDrawerToggle={handleDrawerToggle} />
            </AppBar>
        </Box >
    )
}

export default AppBarDesktop