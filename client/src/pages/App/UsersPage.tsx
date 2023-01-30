import React, { useState } from 'react'
import { CircularProgress } from '@mui/material'
import UserAdd from '../../components/Users/UserAdd/UserAdd'
import UsersTable from '../../components/Users/UsersTable/UsersTable'
import { useApi } from '../../hooks/useApi'

const UsersPage: React.FC = () => {
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const { data, error, loading, executeFetch } = useApi('users/all', 'GET')

    const handleUpdate = (): void => {
        executeFetch()
    }
    const handleClose = (): void => {
        handleUpdate()
        setAddUserOpen(false)
    }

    const handleOpen = (): void => {
        setAddUserOpen(true)
    }

    return (
        <>
            {data && (
                <UsersTable
                    data={data}
                    handleOpen={handleOpen}
                    handleUpdate={handleUpdate}
                />
            )}
            {error && <p>error</p>}
            {loading && <CircularProgress />}
            <UserAdd
                open={addUserOpen}
                handleClose={handleClose}
            />
        </>
    )
}

export default UsersPage
