import { Menu } from '@mui/icons-material'
import { Toolbar, Box, IconButton, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'

interface Props {
    drawerOpen?: boolean
    handleDrawerToggle: () => void
}

const AppBarContent: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
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
                        color='primary'
                    >
                        <MailIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    size='large'
                    color='inherit'
                >
                    <Badge
                        badgeContent={0}
                        color='primary'
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    size='large'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
            </Box>
        </Toolbar>
    )
}

export default AppBarContent
