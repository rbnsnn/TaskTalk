import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const AppLoading: React.FC = () => {
    return (
        <Box
            width='100vw'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 3, mb: 1 }}
        >
            <CircularProgress size={100} />
        </Box>
    )
}

export default AppLoading
