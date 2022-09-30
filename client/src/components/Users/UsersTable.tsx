import React from 'react'
import { Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@mui/material'
import UserRow from './UserRow'
import UsersTableTittle from './UsersTableTittle'


const data = [
    {
        username: 'test',
        userId: '123123123',
        roles: 'admin',
        email: 'test@test.com',
        tasks: 1
    },
    {
        username: 'test2',
        userId: '123123123',
        roles: 'admin',
        email: 'test@test.com',
        tasks: 1
    },
    {
        username: 'test3',
        userId: '123123123',
        roles: 'admin',
        email: 'test@test.com',
        tasks: 1
    }
]



const UsersTable: React.FC = () => {

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: { xs: '90%', sm: '100%' }
            }}
        >
            <UsersTableTittle />
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell variant='headerMain' />
                        <TableCell variant='headerMain'>Username</TableCell>
                        <TableCell variant='headerMain'>User ID</TableCell>
                        <TableCell variant='headerMain'>Role</TableCell>
                        <TableCell variant='headerMain'>Email</TableCell>
                        <TableCell variant='headerMain'>Tasks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user) => (
                        <UserRow key={user.username} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable