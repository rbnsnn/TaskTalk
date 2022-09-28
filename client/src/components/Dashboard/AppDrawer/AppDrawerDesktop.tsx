import React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { styled, Theme, CSSObject } from '@mui/material'
import AppDrawerContent from './AppDrawerContent'
import { DRAWER_WIDTH } from '../../../theme/drawerWidth'


const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

interface Props {
    drawerOpen: boolean
}

const AppDrawerDesktop: React.FC<Props> = ({ drawerOpen }) => {

    return (
        <Drawer
            variant='permanent'
            open={drawerOpen}
            sx={{
                display: { xs: 'none', sm: 'block' }
            }}
        >
            {<AppDrawerContent drawerOpen={drawerOpen} />}
        </Drawer>
    )
}

export default AppDrawerDesktop
