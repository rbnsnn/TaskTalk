import React, { ReactNode } from 'react'
import { Box, styled } from '@mui/material'


interface Props {
    children: ReactNode
}

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppContent: React.FC<Props> = ({ children }) => {
    return (
        <Box
            bgcolor='#eeeeee'
            component='main'
            alignContent='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            flexGrow='1'
            minHeight='100vh'
            maxWidth='100vw'
            sx={{
                padding: { sm: '5%' }
            }}
        >
            <DrawerHeader />
            {children}
        </Box >
    )
}

export default AppContent