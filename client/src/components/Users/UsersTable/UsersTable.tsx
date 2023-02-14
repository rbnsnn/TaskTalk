import React, { useState } from 'react'
import {
    Table,
    TableContainer,
    TableBody,
    TablePagination,
    Slide,
    Box,
} from '@mui/material'
import { UserData } from '../../../types/user-data.type'
import UserRow from './UserRow'
import UsersTableTitle from './UsersTableTitle'
import UsersTableHead from './UsersTableHead'

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
        <Slide
            direction='down'
            in={true}
        >
            <Box>
                <TableContainer
                    sx={{
                        margin: '0 auto',
                        maxWidth: { xs: '95%', sm: '100%', xl: '85%' },
                    }}
                >
                    <UsersTableTitle handleOpen={handleOpen} />
                    <Table
                        size='small'
                        stickyHeader
                    >
                        <UsersTableHead />
                        <TableBody>
                            {data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((user: UserData) => (
                                    <UserRow
                                        key={user.username}
                                        user={user}
                                        handleUpdate={handleUpdate}
                                    />
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Slide>
    )
}

export default UsersTable
