import React from 'react'
import { Menu } from '@mui/icons-material'
import { Toolbar, Box, IconButton, Badge } from '@mui/material'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import UserAvatar from '../../Users/UserAvatar/UserAvatar'

interface Props {
    drawerOpen?: boolean
    handleDrawerToggle: () => void
}

const AppMainBarContent: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    const { userId, firstName, lastName } = useAppSelector(
        (state: RootState) => state.auth.user
    )
    return (
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{
                    mr: 2,
                    display: drawerOpen ? 'none' : 'block',
                }}
            >
                <Menu />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Box>
                <IconButton
                    size='large'
                    color='inherit'
                >
                    <Badge
                        badgeContent={1}
                        color='secondary'
                    >
                        <MailIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    size='large'
                    color='inherit'
                >
                    <Badge
                        badgeContent={1}
                        color='secondary'
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    size='large'
                    color='inherit'
                >
                    <UserAvatar
                        id={userId!}
                        firstName={firstName!}
                        lastName={lastName!}
                    />
                </IconButton>
            </Box>
        </Toolbar>
    )
}

export default AppMainBarContent
