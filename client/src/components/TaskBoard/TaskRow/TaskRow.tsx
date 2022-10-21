import React from 'react'
import { IconButton, Paper, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useDrag } from 'react-dnd'

const TaskRow: React.FC = () => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: 'task',
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        []
    )
    return (
        <Paper
            ref={preview}
            elevation={3}
            sx={{
                mt: 2,
                height: '10%',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'hand',
            }}
        >
            <Typography>test</Typography>
            <IconButton ref={drag}>
                <DragIndicatorIcon />
            </IconButton>
        </Paper>
    )
}

export default TaskRow
