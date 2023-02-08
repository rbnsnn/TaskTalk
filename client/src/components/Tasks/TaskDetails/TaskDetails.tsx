import React from 'react'
import { Slide, Box } from '@mui/material'

const TaskDetails: React.FC = () => {
    return (
        <Slide
            direction='down'
            in={true}
        >
            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Test
            </Box>
        </Slide>
    )
}

export default TaskDetails
