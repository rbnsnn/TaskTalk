import React from 'react'
import { Box, Container } from '@mui/material'
import RegisterForm from '../../components/Auth/RegisterForm'
import Logo from '../../theme/Logo'

const RegisterPage: React.FC = () => {
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
                    <RegisterForm />
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage