import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from './AppMainBarStyled'
import AppMainBarContent from './AppMainBarContent'

interface Props {
    drawerOpen: boolean
    handleDrawerToggle: () => void
}

const AppMainBarMobile: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    return (
        <Box>
            <AppBar
                position='fixed'
                open={drawerOpen}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: { xs: '100%' },
                }}
            >
                <AppMainBarContent handleDrawerToggle={handleDrawerToggle} />
            </AppBar>
        </Box>
    )
}

export default AppMainBarMobile
