import { useEffect, useCallback, useContext } from 'react'
import { UserData } from '../types/user-data.type'
import { TaskData } from '../types/task-data.type'
import { SocketContext } from '../helpers/socket/socket-context'
import { isLongerThan } from '../helpers/formHelper'
import { useApi } from './useApi'
import { useStatusInput } from './useStatusInput'
import { useLabelsInput } from './useLabelsInput'
import { useUsersInput } from './useUsersInput'
import { usePriorityInput } from './usePriorityInput'
import { useTaskInput } from './useTaskInput'

export const useTaskAddDialogHandler = (close: () => void) => {
    const socket: any = useContext(SocketContext)
    const { success, error, loading, executeFetch, reset } = useApi(
        'tasks/new',
        'POST',
        false
    )

    const titleHandler = useTaskInput('Title', isLongerThan(4))
    const { input: title } = titleHandler

    const descriptionHandler = useTaskInput('Description', isLongerThan(8))
    const { input: description } = descriptionHandler

    const usersHandler = useUsersInput()
    const { users, usersApi } = usersHandler

    const statusHandler = useStatusInput()
    const { status, statusApi } = statusHandler

    const labelsHandler = useLabelsInput()
    const { labels, labelsApi } = labelsHandler

    const priorityHandler = usePriorityInput()
    const { priority } = priorityHandler

    const handleSubmit = async (): Promise<any> => {
        const assignes = users.assignedUsers.map((user: UserData) => ({
            userId: user.userId!,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }))

        const newTask: TaskData = {
            taskId: '',
            assignedUsers: assignes,
            status: {
                name: status.assignedStatus!.name,
                color: status.assignedStatus!.color,
            },
            assignedColumn: status.assignedStatus!.columnId,
            priority: priority.priorityValue,
            labels: labels.assignedLabels,
            title: title.value,
            description: description.value,
        }
        await executeFetch(newTask)
        socket.emit('create_task')
    }

    const handleReset = useCallback((): void => {
        title.reset()
        description.reset()
        priority.priorityReset()
        users.setAssignedUsers([])
        status.setAssignedStatus(null)
        statusApi.resetStatus()
        labelsApi.resetLabels()
        usersApi.resetUsers()
        reset()
    }, [
        title,
        description,
        reset,
        priority,
        users,
        usersApi,
        status,
        statusApi,
        labelsApi,
    ])

    const handleCancel = useCallback((): void => {
        close()
        setTimeout(() => handleReset(), 1000)
    }, [close, handleReset])

    let formIsValid = false

    if (
        title.isValid &&
        description.isValid &&
        priority.priorityIsValid &&
        users.assignedUsers.length > 0 &&
        !status.assignedStatusHasError &&
        status.assignedStatusTouched
    ) {
        formIsValid = true
    }

    useEffect(() => {
        if (!success) {
            return
        }
        const userAdded = setTimeout(() => {
            handleCancel()
        }, 1000)

        return () => {
            clearTimeout(userAdded)
        }
    }, [success, handleCancel, reset])

    return {
        handlers: {
            statusHandler,
            usersHandler,
            labelsHandler,
            titleHandler,
            descriptionHandler,
            priorityHandler,
        },
        dialog: {
            handleCancel,
            handleSubmit,
            formIsValid,
        },
        dialogApi: {
            error,
            success,
            loading,
        },
    }
}
