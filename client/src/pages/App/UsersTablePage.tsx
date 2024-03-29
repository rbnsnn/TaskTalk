import React, { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import UserAdd from '../../components/Users/UserAdd/UserAdd'
import UsersTable from '../../components/Users/UsersTable/UsersTable'
import LoadingPage from './LoadingPage'

const UsersTablePage: React.FC = () => {
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
            {error && <p>Something went wrong</p>}
            {loading && <LoadingPage />}
            <UserAdd
                open={addUserOpen}
                handleClose={handleClose}
            />
        </>
    )
}

export default UsersTablePage
