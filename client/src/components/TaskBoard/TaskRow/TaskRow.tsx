import React from 'react'
import { Avatar, Chip, Box, IconButton, Paper, Typography } from '@mui/material'
import { useDrag } from 'react-dnd'
import TaskLabel from './TaskLabel'
import TaskTitle from './TaskTitle'
import { setPriorityColor } from './setPriorityColor'

interface Props {
    task: any
}

const TaskRow: React.FC<Props> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(
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

    const priorityColor = setPriorityColor(task.priority)

    return (
        <Paper
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
                borderTop: `5px solid ${priorityColor}`,
            }}
        >
            <Box width='100%'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <TaskTitle
                        id={task.taskId}
                        priority={task.priority}
                    />
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
                    <TaskLabel
                        key={label}
                        label={label}
                    />
                ))}
            </Box>
        </Paper>
    )
}

export default TaskRow
