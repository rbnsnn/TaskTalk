import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from './AppMainBarStyled'
import AppBarContent from './AppMainBarContent'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppMainBarDesktop: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <Box>
            <AppBar
                position='fixed'
                open={drawerOpen}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <AppBarContent
                    drawerOpen={drawerOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />
            </AppBar>
        </Box>
    )
}

export default AppMainBarDesktop
