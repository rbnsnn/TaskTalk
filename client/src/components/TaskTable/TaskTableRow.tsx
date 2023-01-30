import { TableCell, TableRow, Chip, Box, AvatarGroup } from '@mui/material'
import React from 'react'
import { TaskData } from '../../types/task-data.type'
import { setPriorityColor } from '../TaskBoard/TaskRow/setPriorityColor'
import UserAvatarTable from '../Users/UserAvatar/UserAvatarTable'
import TextLink from '../TextLink'

interface Props {
    task: TaskData
}
const TaskTableRow: React.FC<Props> = ({ task }) => {
    const priorityColor = setPriorityColor(task.priority)
    const date = new Date(task.created!).toLocaleDateString()
    const assigned = task.assignedUsers.map((user) => user.userId)
    return (
        <TableRow hover>
            <TableCell
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Box>
                    <TextLink
                        variant='h6'
                        to={`../task/${task.taskId}`}
                    >
                        {task.title}
                    </TextLink>
                </Box>

                <Box mt={1}>
                    <Chip
                        label='label'
                        size='small'
                    />
                </Box>
            </TableCell>
            <TableCell align='right'>
                <AvatarGroup max={3}>
                    {assigned.map((user: string) => (
                        <UserAvatarTable
                            key={user}
                            id={user}
                        />
                    ))}
                </AvatarGroup>
            </TableCell>
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
