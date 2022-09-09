import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import ListItemLink from './ListItemLink';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const AppDrawerContent: React.FC = () => {

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItemLink to={'/dashboard'} text='Dashboard' icon={<DashboardIcon />} />
                <ListItemLink to={'/test'} text='Test' icon={<MailIcon />} />

            </List>
            <Divider />
            <List>
                {/* <ListItemLink to={'/dashboard'} text='Dashboard' icon={<DashboardIcon />} /> */}
                <ListItemLink to={'/test'} text='Test' icon={<MailIcon />} />

            </List>
            <Divider />
            <ListItemLink to={'/logout'} text='Logout' icon={<LogoutIcon />} />
        </div >
    )
}

export default AppDrawerContent