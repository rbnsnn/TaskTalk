import React, { useState } from 'react'
import {
    Paper,
    Table,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    TablePagination,
} from '@mui/material'
import UserRow from './UserRow'
import UsersTableTitle from './UsersTableTitle'
import { UserData } from '../../types/user-data.type'

interface Props {
    data: UserData[]
    handleOpen: () => void
    handleUpdate: () => void
}

const UsersTable: React.FC<Props> = ({ data, handleOpen, handleUpdate }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = useState(0)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper sx={{ width: { md: '70%' }, margin: '0 auto' }}>
            <TableContainer
                sx={{
                    maxWidth: { xs: '95%', sm: '100%' },
                }}
            >
                <UsersTableTitle handleOpen={handleOpen} />
                <Table
                    size='small'
                    stickyHeader
                >
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
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user: UserData) => (
                                <UserRow
                                    key={user.username}
                                    user={user}
                                    handleUpdate={handleUpdate}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default UsersTable
