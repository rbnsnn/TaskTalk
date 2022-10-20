import { Paper, Typography } from '@mui/material'
import { maxWidth } from '@mui/system'
import React from 'react'

const TaskRow = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                mt: 2,
                height: '10%',
            }}
        >
            <Typography>test</Typography>
        </Paper>
    )
}

export default TaskRow
