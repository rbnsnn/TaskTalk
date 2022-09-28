import { Box } from '@mui/material'
import React from 'react'

interface Props {
    drawerWidth: number
}

const AppContent: React.FC<Props> = ({ drawerWidth }) => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
            minWidth='0'

        // sx={{
        //     width: { sm: `calc(100% - ${drawerWidth}px)` },
        //     ml: { sm: `${drawerWidth}px` },
        // }}
        >
            <div>test</div>
        </Box>
    )
}

export default AppContent