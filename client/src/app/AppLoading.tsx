import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const AppLoading: React.FC = () => {
    return (
        <Box
            width='100%'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <CircularProgress size={100} />
        </Box>
    )
}

export default AppLoading
