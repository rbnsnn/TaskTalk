import React from 'react'
import { Box, Container } from '@mui/material'
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Logo from '../app/theme/Logo'
import { Outlet } from 'react-router-dom'

const AuthPage: React.FC = () => {

    return (
        <Container maxWidth='xs'>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
                sx={{ mt: -10 }}

            >
                <Logo />
                <Box sx={{ mt: 5 }}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    )
}

export default AuthPage