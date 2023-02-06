import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

import TaskLabel from './TaskLabel'
import TaskTitle from './TaskTitle'
import { setPriorityColor } from './setPriorityColor'

interface Props {
    index: number
    task: any
}

const TaskRow: React.FC<Props> = ({ index, task }) => {
    const priorityColor = setPriorityColor(task.priority)
    return (
        <Paper
            elevation={6}
            sx={{
                mt: 1,
                mb: 1,
                p: 1,
                height: '10%',
                opacity: 1,
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'grab',
                borderTop: `5px solid ${priorityColor}`,
                width: '100%',
            }}
        >
            <Box width='100%'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <TaskTitle
                        taskId={task.taskId}
                        columnId={task.assignedColumn}
                        title={task.title}
                        priority={task.priority}
                        assignedUsers={task.assignedUsers}
                    />
                </Box>
                <Box ml={1}>
                    <Typography fontSize='large'>{task.title}</Typography>
                </Box>
                <Box
                    mt={2}
                    ml={1}
                >
                    <Typography
                        fontSize='small'
                        sx={{
                            wordWrap: 'break-word',
                        }}
                    >
                        {task.description}
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
