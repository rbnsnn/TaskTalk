import React, { useState } from 'react'
import { Box, Container } from '@mui/material'

import LoginForm from '../components/AuthForms/LoginForm'
import RegisterForm from '../components/AuthForms/RegisterForm'
import Logo from '../app/Logo'

const AuthPage: React.FC = () => {
    const [isMember, setIsMember] = useState<boolean>(true)

    const handleFormChange = (): void => {
        setIsMember(prev => !prev)
    }

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
                {isMember && <LoginForm handleFormChange={handleFormChange} />}
                {!isMember && <RegisterForm handleFormChange={handleFormChange} />}
            </Box>
        </Container>
    )
}

export default AuthPage