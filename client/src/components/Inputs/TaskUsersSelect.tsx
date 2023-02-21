import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { UserData } from '../../types/user-data.type'
import { UseUsersReturnI } from '../../hooks/useUsersInput'

interface Props {
    usersHandler: UseUsersReturnI
    taskEdit?: boolean
}

const TaskUsersSelect: React.FC<Props> = ({ usersHandler, taskEdit = false }) => {
    const {
        assignedUsers,
        setAssignedUsers,
        assignedUsersHasError,
        setAssignedUsersHasError,
    } = usersHandler.users
    const { usersData } = usersHandler.usersApi

    return (
        <Autocomplete
            sx={{ mt: 2 }}
            multiple
            limitTags={taskEdit ? -1 : 4}
            id='assigned-users'
            options={usersData ? usersData : []}
            getOptionLabel={(option: UserData) => option.username}
            renderOption={(props, option) => (
                <Box
                    component='li'
                    {...props}
                >
                    {option.username}{' '}
                    {option.firstName && option.lastName
                        ? `(${option.firstName} ${option.lastName})`
                        : ''}
                </Box>
            )}
            filterSelectedOptions
            value={assignedUsers}
            onChange={(event: any, newValue: UserData[] | [], reason: string) => {
                if (reason === 'clear') {
                    setAssignedUsers([])
                    setAssignedUsersHasError(true)
                } else {
                    setAssignedUsers(newValue)
                    if (newValue.length < 1) {
                        setAssignedUsersHasError(true)
                    } else {
                        setAssignedUsersHasError(false)
                    }
                }
            }}
            onBlur={() => {
                if (assignedUsers.length === 0) {
                    setAssignedUsersHasError(true)
                }
            }}
            renderInput={(params) => (
                <TextField
                    error={assignedUsersHasError}
                    helperText={assignedUsersHasError ? 'Assigned cannot be empty' : ''}
                    required
                    {...params}
                    label='Assign task to'
                />
            )}
        />
    )
}

export default TaskUsersSelect
