import React from 'react'
import { Box, Container } from '@mui/material'
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import Logo from '../app/theme/Logo'
import { Routes, Route } from 'react-router-dom'

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
                    <Routes>
                        <Route path='login' element={<LoginForm />} />
                        <Route path='register' element={<RegisterForm />} />
                        <Route path='resetpassword' element={<div>Reseet</div>} />

                    </Routes>
                </Box>
            </Box>
        </Container>
    )
}

export default AuthPage