import React, { useState, useContext } from 'react'
import { Box, IconButton, AvatarGroup, Chip } from '@mui/material'
import { Priority } from '../../../types/priority-enum'
import { setPriorityColor } from '../../../helpers/setPriorityColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TextLink from '../../TextLink'
import DeleteTaskDialog from './TaskDeleteDialog'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../types/task-event-enum.type'
import TaskIcon from '@mui/icons-material/Task'
import { CompanyUsers } from '../../../types/company-users.type'
import UserAvatarTable from '../../Users/UserAvatar/UserAvatar'

interface Props {
    taskId: string
    columnId: string
    title: string
    priority: Priority
    assignedUsers: CompanyUsers[]
}

const TaskRowTitle: React.FC<Props> = ({
    taskId,
    columnId,
    title,
    priority,
    assignedUsers,
}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const socket: any = useContext(SocketContext)
    const priorityColor = setPriorityColor(priority)

    const handleClose = (): void => {
        setDeleteDialogOpen(false)
    }
    const handleDelete = (): void => {
        socket.emit(TaskEvent.DeleteTask, { taskId, columnId })
        handleClose()
    }
    const handleOpen = (): void => {
        setDeleteDialogOpen(true)
    }

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            width='100%'
        >
            <Box
                display='flex'
                flexDirection='row'
            >
                <TaskIcon sx={{ mr: 1 }} />
                <TextLink to={`../task/${taskId}`}>{taskId}</TextLink>
            </Box>
            <AvatarGroup
                sx={{ ml: 'auto' }}
                max={3}
            >
                {assignedUsers.map((user: CompanyUsers) => (
                    <UserAvatarTable
                        popper
                        key={user.userId}
                        id={user.userId}
                        firstName={user.firstName!}
                        lastName={user.lastName!}
                    />
                ))}
            </AvatarGroup>
            <Chip
                label={priority}
                size='small'
                sx={{
                    ml: 2,
                    backgroundColor: priorityColor,
                    color: 'white',
                }}
            />
            <IconButton
                color='error'
                size='small'
                onClick={handleOpen}
                sx={{
                    ml: 1,
                }}
            >
                <DeleteForeverIcon />
            </IconButton>
            {deleteDialogOpen && (
                <DeleteTaskDialog
                    open={deleteDialogOpen}
                    title={title}
                    taskId={taskId}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                />
            )}
        </Box>
    )
}

export default TaskRowTitle
