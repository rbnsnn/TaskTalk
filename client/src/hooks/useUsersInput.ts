import { useState, useEffect } from 'react'
import { useApi } from './useApi'
import { UserData } from '../types/user-data.type'
import { CompanyUsers } from '../types/company-users.type'

export interface UseUsersReturnI {
    users: {
        assignedUsers: UserData[]
        setAssignedUsers: any
        assignedUsersHasError: boolean
        setAssignedUsersHasError: any
    }
    usersApi: {
        usersData: UserData[]
        usersLoading: boolean
        resetUsers: () => void
        refetchUsers: () => void
    }
}

export const useUsersInput = (active?: CompanyUsers[]): UseUsersReturnI => {
    const [assignedUsers, setAssignedUsers] = useState<UserData[]>([])
    const [assignedUsersHasError, setAssignedUsersHasError] = useState<boolean>(false)
    const {
        data: usersData,
        reset: resetUsers,
        loading: usersLoading,
        executeFetch: refetchUsers,
    } = useApi('users/all', 'GET')

    useEffect(() => {
        if (usersData && active) {
            const activeUsers = usersData.filter((user: UserData) =>
                active.find((activeUser) => activeUser.username === user.username)
            )
            setAssignedUsers(activeUsers)
        }
    }, [usersLoading, active, usersData])

    return {
        users: {
            assignedUsers,
            setAssignedUsers,
            assignedUsersHasError,
            setAssignedUsersHasError,
        },
        usersApi: {
            usersData,
            usersLoading,
            resetUsers,
            refetchUsers,
        },
    }
}
