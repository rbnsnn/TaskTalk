import React from 'react'
import { Divider, List, Toolbar } from '@mui/material'
import ListItemLink from './ListItemLink'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'


interface Props {
    drawerOpen: boolean
}

const AppDrawerContent: React.FC<Props> = ({ drawerOpen }) => {

    return (
        <div>
            <Toolbar>
                {drawerOpen ? 'Hello' : ''}
            </Toolbar>
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