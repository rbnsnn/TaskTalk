import React from 'react'
import { IconButton, Paper, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useDrag } from 'react-dnd'

interface DropResult {
    name: string
}

interface Props {
    task: any
}

const TaskRow: React.FC<Props> = ({ task }) => {
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            item: task,
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
            <Typography>{task.title}</Typography>
            <IconButton
                ref={drag}
                sx={{
                    cursor: 'move',
                }}
            >
                <DragIndicatorIcon />
            </IconButton>
        </Paper>
    )
}

export default TaskRow
