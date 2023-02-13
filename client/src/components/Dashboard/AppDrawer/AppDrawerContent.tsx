import React from 'react'
import { Divider, IconButton, List, ListItem } from '@mui/material'
import { DrawerHeader } from '../AppContent/AppContent'
import { useRole } from '../../../hooks/useRole'
import { Role } from '../../../types/roles-enum.type'
import ListItemLink from '../../Links/ListItemLink'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import ListIcon from '@mui/icons-material/List'
import AppDrawerThemeSwitch from './AppDrawerThemeSwitch'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

interface Props {
    drawerOpen?: boolean
    handleDrawerToggle: () => void
}

const AppDrawerContent: React.FC<Props> = ({ drawerOpen, handleDrawerToggle }) => {
    const admin = useRole(Role.ADMIN)

    return (
        <div>
            <DrawerHeader>
                {drawerOpen ? (
                    <IconButton onClick={handleDrawerToggle}>
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    ''
                )}
            </DrawerHeader>

            <List>
                <ListItemLink
                    to={'/dashboard'}
                    text='Dashboard'
                    icon={<DashboardIcon />}
                />
                <ListItemLink
                    to={'/board'}
                    text='Board'
                    icon={<ViewKanbanIcon />}
                />
                <ListItemLink
                    to={'/tasks'}
                    text='Tasks'
                    icon={<ListIcon />}
                />
            </List>
            {admin && (
                <>
                    <Divider />
                    <List>
                        <ListItemLink
                            to={'/labels'}
                            text='Labels'
                            icon={<BookmarksIcon />}
                        />
                        <ListItemLink
                            to={'/users'}
                            text='Users'
                            icon={<PeopleIcon />}
                        />
                    </List>
                </>
            )}
            <Divider />
            <ListItemLink
                to={'/logout'}
                text='Logout'
                icon={<LogoutIcon />}
            />
            <Divider />

            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <AppDrawerThemeSwitch />
            </ListItem>
        </div>
    )
}

export default AppDrawerContent
