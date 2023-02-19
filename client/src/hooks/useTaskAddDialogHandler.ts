import { useEffect, useCallback, useContext } from 'react'

import { UserData } from '../types/user-data.type'
import { TaskData } from '../types/task-data.type'
import { SocketContext } from '../helpers/socket/socket-context'
import { isLongerThan } from '../helpers/formHelper'
import { isNotEmpty } from '../helpers/formHelper'
import { useApi } from './useApi'
import { useInput } from './useInput'
import { useStatusInput } from './useStatusInput'
import { useLabelsInput } from './useLabelsInput'
import { useUsersInput } from './useUsersInput'

export const useTaskAddDialogHandler = (close: () => void) => {
    const socket: any = useContext(SocketContext)
    const { success, error, loading, executeFetch, reset } = useApi(
        'tasks/new',
        'POST',
        false
    )

    const usersHandler = useUsersInput()
    const { users, usersApi } = usersHandler

    const statusHandler = useStatusInput()
    const { status, statusApi } = statusHandler

    const labelsHandler = useLabelsInput()
    const { labels, labelsApi } = labelsHandler

    const fetchData = async () => {
        await statusApi.refetchStatus()
        await usersApi.refetchUsers()
        await labelsApi.refetchLabels()
    }

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
    } = useInput(isLongerThan(4))

    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput(isLongerThan(10))

    const {
        value: priorityValue,
        isValid: priorityIsValid,
        hasError: priorityHasError,
        valueChangeHandler: priorityChangeHandler,
        inputBlurHandler: priorityBlurHandler,
        reset: priorityReset,
    } = useInput(isNotEmpty)

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
            priority: priorityValue,
            labels: labels.assignedLabels,
            title: titleValue,
            description: descriptionValue,
        }
        await executeFetch(newTask)
        socket.emit('create_task')
    }

    const descriptionHandler = {}
    const titleHandler = {}

    const handleReset = useCallback((): void => {
        titleReset()
        descriptionReset()
        priorityReset()
        users.setAssignedUsers([])
        status.setAssignedStatus(null)
        statusApi.resetStatus()
        labelsApi.resetLabels()
        usersApi.resetUsers()
        reset()
    }, [
        titleReset,
        descriptionReset,
        reset,
        priorityReset,
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
        titleIsValid &&
        descriptionIsValid &&
        priorityIsValid &&
        users.assignedUsers.length > 0 &&
        !status.assignedStatusHasError &&
        status.assignedStatusTouched
    ) {
        formIsValid = true
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
