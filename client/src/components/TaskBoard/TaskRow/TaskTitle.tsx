import React, { useState, useContext } from 'react'
import { Box, IconButton, Avatar, Typography, Chip } from '@mui/material'
import { Priority } from '../../../types/priority-enum'
import { setPriorityColor } from './setPriorityColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TextLink from '../../TextLink'
import DeleteTaskDialog from './DeleteTaskDialog'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../types/task-event-enum.type'

interface Props {
    taskId: string
    columnId: string
    title: string
    priority: Priority
}

const TaskTitle: React.FC<Props> = ({ taskId, columnId, title, priority }) => {
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
                ID:
            </Typography>
            <Box ml={1}>
                <TextLink to={`../task/${taskId}`}>{taskId}</TextLink>
            </Box>

            <Chip
                label={priority}
                size='small'
                sx={{
                    ml: 'auto',
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

export default TaskTitle
