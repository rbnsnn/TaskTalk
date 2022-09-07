import React, { useEffect } from 'react'
import { Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux-hooks'
import { authActions } from '../components/Auth/authSlice'


const DashboardPage: React.FC = () => {

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(authActions.logout())
    }

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
                <Box sx={{ mt: 5 }}>
                    Welcome
                    <Link to={'profile'}>profile</Link>
                    <Button onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default DashboardPage