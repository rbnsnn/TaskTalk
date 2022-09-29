import React from 'react'
import { Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@mui/material'
import UserRow from './UserRow'

const data = [
    {
        username: 'test',
        roles: 'admin',
        email: 'test@test.com',
        tasks: 1
    },
    {
        username: 'test',
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
                maxWidth: { xs: '90%', sm: '60%' }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow selected>
                        <TableCell variant='headerMain' />
                        <TableCell variant='headerMain'>Username</TableCell>
                        <TableCell variant='headerMain' align="right">Role</TableCell>
                        <TableCell variant='headerMain' align="right">Email</TableCell>
                        <TableCell variant='headerMain' align="right">Tasks</TableCell>
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