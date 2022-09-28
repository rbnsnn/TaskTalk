import React from 'react'
import { Box, Container } from '@mui/material'
import LoginForm from '../../components/Auth/LoginForm'
import Logo from '../../theme/Logo'


const AuthPage: React.FC = () => {
    return (
        <Container maxWidth='xs'>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
            >
                <Logo />
                <Box sx={{ mt: 5 }}>
                    <LoginForm />
                </Box>
            </Box>
        </Container>
    )
}

export default AuthPage