import { TableCell, TableRow, Chip, Box, AvatarGroup } from '@mui/material'
import React from 'react'
import { TaskData } from '../../../types/task-data.type'
import { setPriorityColor } from '../../../helpers/setPriorityColor'
import UserAvatar from '../../Users/UserAvatar/UserAvatar'
import TextLink from '../../TextLink'
import { CompanyUsers } from '../../../types/company-users.type'

interface Props {
    task: TaskData
}
const TasksTableRow: React.FC<Props> = ({ task }) => {
    const priorityColor = setPriorityColor(task.priority)
    const date = new Date(task.created!).toLocaleDateString()

    return (
        <TableRow hover>
            <TableCell
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Box textAlign='left'>
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
                    {task.assignedUsers.map((user: CompanyUsers) => (
                        <UserAvatar
                            popper
                            key={user.userId}
                            id={user.userId}
                            firstName={user.firstName!}
                            lastName={user.lastName!}
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

export default TasksTableRow
