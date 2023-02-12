import React, { useState, useContext } from 'react'
import { Box, IconButton, AvatarGroup, Chip } from '@mui/material'
import { Priority } from '../../../../types/priority-enum'
import { setPriorityColor } from '../../../../helpers/setPriorityColor'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../../types/task-event-enum.type'
import { CompanyUsers } from '../../../../types/company-users.type'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TextLink from '../../../Links/TextLink'
import TaskDeleteDialog from '../../TaskDelete/TaskDeleteDialog'
import TaskIcon from '@mui/icons-material/Task'
import UserAvatar from '../../../Users/UserAvatar/UserAvatar'

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
                max={4}
                sx={{
                    ml: 'auto',
                    '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 },
                }}
            >
                {assignedUsers.map((user: CompanyUsers) => (
                    <UserAvatar
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
                <TaskDeleteDialog
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
