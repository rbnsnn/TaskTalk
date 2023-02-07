import React, { ReactNode } from 'react'
import { Container, styled } from '@mui/material'

interface Props {
    children: ReactNode
}

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}))

const AppContent: React.FC<Props> = ({ children }) => {
    return (
        <Container
            className='mainContainer'
            maxWidth={false}
            sx={{
                display: 'flex',
                alignContent: 'center',
                flexDirection: 'column',
                flexGrow: '1',
                minHeight: '100vh',
                paddingTop: { xs: '20px' },
            }}
        >
            <DrawerHeader />
            {children}
        </Container>
    )
}

export default AppContent
