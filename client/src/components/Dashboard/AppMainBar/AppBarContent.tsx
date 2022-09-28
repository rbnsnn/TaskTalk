import { Menu } from '@mui/icons-material'
import { Toolbar, Typography, Button, IconButton } from '@mui/material'


interface Props {
    drawerOpen?: boolean
    handleDrawerToggle: () => void
}

const AppBarContent: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {

    return (
        <Toolbar>
            <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{
                    mr: 2,
                    display: drawerOpen ? 'none' : 'block'
                }}
            >
                <Menu />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                News
            </Typography>
            <Button color='inherit'>Logout</Button>
        </Toolbar>
    )
}

export default AppBarContent