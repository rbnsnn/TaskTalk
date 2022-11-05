import React from 'react'
import { Avatar, Chip, Box, IconButton, Paper, Typography } from '@mui/material'
import TextLink from '../../TextLink'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useDrag } from 'react-dnd'
import AdjustIcon from '@mui/icons-material/Adjust'
import TaskLabel from './TaskLabel'

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
            // ref={preview}
            ref={drag}
            elevation={3}
            sx={{
                mt: 2,
                p: 1,
                height: '10%',
                opacity: isDragging ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'grab',
            }}
        >
            <Box width='100%'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='flex-start'
                        width='100%'
                    >
                        <IconButton>
                            <Avatar
                                sx={{
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '16px',
                                    bgcolor: 'orange',
                                }}
                            >
                                u
                            </Avatar>
                        </IconButton>
                        <Typography
                            ml={1}
                            display='inline'
                            fontSize='small'
                        >
                            {task.id}
                        </Typography>
                        <Chip
                            label={task.status}
                            size='small'
                            sx={{
                                ml: 'auto',
                            }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            wordWrap: 'break-word',
                        }}
                    >
                        {task.title}
                    </Typography>
                </Box>
                {task.labels.map((label: string) => (
                    <TaskLabel label={label} />
                ))}
            </Box>
        </Paper>
    )
}

export default TaskRow
