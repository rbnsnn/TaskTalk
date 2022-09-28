import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from './AppBarStyled'
import AppBarContent from './AppBarContent'


interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppBarMobile: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <Box>
            <AppBar
                position='fixed'
                open={drawerOpen}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: { xs: '100%' }
                }}
            >
                <AppBarContent handleDrawerToggle={handleDrawerToggle} />
            </AppBar>
        </Box >
    )
}

export default AppBarMobile