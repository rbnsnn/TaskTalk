import React from 'react'
import { Divider, IconButton, List } from '@mui/material'
import ListItemLink from './ListItemLink'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { DrawerHeader } from '../AppContent/AppContent'


interface Props {
    drawerOpen?: boolean
    handleDrawerToggle: () => void
}

const AppDrawerContent: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {

    return (
        <div>
            <DrawerHeader>
                {drawerOpen ?
                    <IconButton onClick={handleDrawerToggle}>
                        <ChevronLeftIcon />
                    </IconButton> : ''}
            </DrawerHeader>
            <Divider />
            <List>
                <ListItemLink to={'/dashboard'} text='Dashboard' icon={<DashboardIcon />} />

            </List>
            <Divider />
            <List>
                <ListItemLink to={'/users'} text='Users' icon={<PeopleIcon />} />

            </List>
            <Divider />
            <ListItemLink to={'/logout'} text='Logout' icon={<LogoutIcon />} />
        </div >
    )
}

export default AppDrawerContent