import React, { useContext, useEffect } from 'react'
import { Box, Alert, Button, CircularProgress } from '@mui/material'
import {
    CheckUpdate,
    checkUpdateAvaiable,
} from '../../../../helpers/TaskDetails/checkUpdateAvaiable'
import { TaskData } from '../../../../types/task-data.type'
import { CompanyUsers } from '../../../../types/company-users.type'
import { UserData } from '../../../../types/user-data.type'
import { useApi } from '../../../../hooks/useApi'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../../types/task-event-enum.type'

const TaskDetailsSaveChangesButton: React.FC<CheckUpdate> = ({
    data,
    handlersValues,
}) => {
    const socket: any = useContext(SocketContext)
    const { success, loading, error, reset, executeFetch } = useApi(
        `tasks/id/${data.taskId}`,
        'PUT',
        false
    )

    const { title, description, priority, status, users, labels } = handlersValues
    const disabled = checkUpdateAvaiable({ data, handlersValues })

    const assignedUsers: CompanyUsers[] = users.map((user: UserData) => ({
        userId: user.userId!,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
    }))

    const updatedTask: TaskData = {
        ...data,
        title,
        description,
        priority,
        assignedUsers,
        status: { name: status?.name!, color: status?.color! },
        assignedColumn: status?.columnId!,
        labels,
    }

    const handleSubmit = async () => {
        await executeFetch(updatedTask)
        socket.emit(TaskEvent.UpdateTask)
    }

    useEffect(() => {
        if (!success) {
            return
        }
        const closeAlert = setTimeout(() => {
            reset()
        }, 2000)

        return () => {
            clearTimeout(closeAlert)
        }
    })

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            {!loading && (
                <Button
                    disabled={disabled}
                    size='small'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            )}
            {loading && <CircularProgress />}
            {success && (
                <Alert
                    severity='success'
                    sx={{ padding: '0 16px' }}
                >
                    Task updated successfully
                </Alert>
            )}
            {error && (
                <Alert
                    severity='error'
                    sx={{ padding: '0 16px' }}
                >
                    {error}
                </Alert>
            )}
        </Box>
    )
}

export default TaskDetailsSaveChangesButton
