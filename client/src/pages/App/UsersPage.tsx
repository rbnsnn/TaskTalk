import React, { useState } from 'react'
import AddUser from '../../components/Users/AddUser/AddUser'
import UsersTable from '../../components/Users/UsersTable'
import { useApi } from '../../hooks/useApi'


const UsersPage: React.FC = () => {
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const {data, error, loading} = useApi('users/all', 'GET')
    console.log(data)

    const handleClose = (): void => {
        setAddUserOpen(false)
    }

    const handleOpen = (): void => {
        setAddUserOpen(true)
    }
    return (
        <>
            {data && <UsersTable data={data} handleOpen={handleOpen} />}
            {error && <p>error</p>}
            <AddUser open={addUserOpen} handleClose={handleClose} />
        </>
    )
}

export default UsersPage