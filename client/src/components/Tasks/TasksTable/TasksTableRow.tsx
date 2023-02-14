import React from 'react'
import { TableCell, TableRow, Chip, Box, AvatarGroup, styled } from '@mui/material'
import { TaskData } from '../../../types/task-data.type'
import { setPriorityColor } from '../../../helpers/setPriorityColor'
import { CompanyUsers } from '../../../types/company-users.type'
import { LabelI } from '../../../types/task-label.type'
import Label from '../../Labels/Label'
import UserAvatar from '../../Users/UserAvatar/UserAvatar'
import TextLink from '../../Links/TextLink'

const TableChip = styled(Chip)<{ contrast: string }>(({ theme, contrast }) => ({
    color: contrast ? theme.palette.getContrastText(contrast) : '',
    textAlign: 'center',
}))

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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 2,
                    }}
                >
                    {task.labels.map((label: LabelI) => (
                        <Label
                            key={label.label}
                            label={label.label}
                            description={label.description}
                            color={label.color}
                        />
                    ))}
                </Box>
            </TableCell>
            <TableCell align='right'>
                <AvatarGroup
                    max={4}
                    sx={{
                        '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 },
                    }}
                >
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
                <TableChip
                    contrast={task.status.color}
                    label={task.status.name}
                    size='small'
                    sx={{
                        backgroundColor: task.status.color,
                    }}
                />
            </TableCell>
            <TableCell align='right'>{task.taskId}</TableCell>
            <TableCell align='right'>{date}</TableCell>
        </TableRow>
    )
}

export default TasksTableRow
