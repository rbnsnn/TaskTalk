import { useState } from 'react'
import { useApi } from './useApi'
import { UserData } from '../types/user-data.type'

export interface UseTaskReturnI {
    users: {
        assignedUsers: UserData[]
        setAssignedUsers: any
        assignedUsersHasError: boolean
        setAssignedUsersHasError: any
    }
    usersApi: {
        usersData: UserData[]
        resetUsers: () => void
        refetchUsers: () => void
    }
}

export const useUsersInput = (): UseTaskReturnI => {
    const [assignedUsers, setAssignedUsers] = useState<UserData[]>([])
    const [assignedUsersHasError, setAssignedUsersHasError] = useState<boolean>(false)
    const {
        data: usersData,
        reset: resetUsers,
        executeFetch: refetchUsers,
    } = useApi('users/all', 'GET', false)

    return {
        users: {
            assignedUsers,
            setAssignedUsers,
            assignedUsersHasError,
            setAssignedUsersHasError,
        },
        usersApi: {
            usersData,
            resetUsers,
            refetchUsers,
        },
    }
}
