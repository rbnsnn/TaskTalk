import React, { useState } from 'react'
import AddUser from '../../components/Users/AddUser/AddUser'
import UsersTable from '../../components/Users/UsersTable'


const UsersPage: React.FC = () => {
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddUserOpen(false)
    }

    const handleOpen = (): void => {
        setAddUserOpen(true)
    }
    return (
        <>
            <UsersTable handleOpen={handleOpen} />
            <AddUser open={addUserOpen} handleClose={handleClose} />
        </>
    )
}

export default UsersPage