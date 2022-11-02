import React from 'react'
import { Avatar, AvatarGroup, Box, IconButton, Paper, Typography } from '@mui/material'
import TextLink from '../../TextLink'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useDrag } from 'react-dnd'
import AdjustIcon from '@mui/icons-material/Adjust'

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
            options: {
                dropEffect: 'grabbing',
            },
        }),
        []
    )

    return (
        <Paper
            ref={preview}
            elevation={3}
            sx={{
                mt: 2,
                p: 1,
                height: '10%',
                opacity: isDragging ? 0.5 : 1,
                cursor: isDragging ? 'grabbing' : 'auto',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    <AdjustIcon fontSize='small' />
                    <Typography
                        ml={1}
                        display='inline'
                        fontSize='small'
                    >
                        {task.id}
                    </Typography>

                    <Avatar
                        sx={{
                            width: '20px',
                            height: '20px',
                            fontSize: '16px',
                        }}
                    >
                        u
                    </Avatar>
                </Box>
                <TextLink to={`/tasks/${task.id}`}>{task.title}</TextLink>
            </Box>
            <IconButton
                ref={drag}
                sx={{
                    cursor: 'grab',
                }}
            >
                <DragIndicatorIcon />
            </IconButton>
        </Paper>
    )
}

export default TaskRow
