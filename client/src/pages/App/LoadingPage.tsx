import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const LoadingPage: React.FC = () => {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'fles',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress size={70} />
        </Box>
    )
}

export default LoadingPage
