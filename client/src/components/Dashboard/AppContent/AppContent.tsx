import React, { ReactNode } from 'react'
import { Box, styled } from '@mui/material'


interface Props {
    children: ReactNode
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppContent: React.FC<Props> = ({ children }) => {
    return (
        <Box
            component='main'
            alignContent='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            flexGrow='1'
            padding='4'
            minHeight='100vh'
        >
            <DrawerHeader />
            {children}
            {children}
        </Box >
    )
}

export default AppContent