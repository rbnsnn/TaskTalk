import { TableCell, TableRow, Chip, Box, Typography } from '@mui/material'
import React from 'react'
import { TaskData } from '../../types/task-data.type'
import { setPriorityColor } from '../TaskBoard/TaskRow/setPriorityColor'

interface Props {
    task: TaskData
}
const TaskTableRow: React.FC<Props> = ({ task }) => {
    const priorityColor = setPriorityColor(task.priority)
    const date = new Date(task.created!).toLocaleDateString()
    const assigned = task.assignedUsers.map((user) => user.username)
    return (
        <TableRow hover>
            <TableCell>
                <Typography>
                    <b>{task.title}</b>
                </Typography>
                <Box mt={1}>
                    <Chip
                        label='label'
                        size='small'
                    />
                </Box>
            </TableCell>
            <TableCell align='right'>{assigned}</TableCell>
            <TableCell align='right'>
                <Chip
                    label={task.priority}
                    size='small'
                    sx={{
                        ml: 'auto',
                        backgroundColor: priorityColor,
                        color: 'white',
                    }}
                />
            </TableCell>
            <TableCell align='right'>
                <Chip
                    label={task.status}
                    size='small'
                />
            </TableCell>
            <TableCell align='right'>{task.taskId}</TableCell>
            <TableCell align='right'>{date}</TableCell>
        </TableRow>
    )
}

export default TaskTableRow
