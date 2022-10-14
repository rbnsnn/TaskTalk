import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const AppLoading: React.FC = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 3, mb: 1 }}
        >
            <CircularProgress />
        </Box>
    )
}

export default AppLoading
