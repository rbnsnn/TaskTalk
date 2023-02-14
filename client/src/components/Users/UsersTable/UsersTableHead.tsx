import React from 'react'
import { TableHead, TableCell, TableRow } from '@mui/material'

const UsersTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell width='10%' />
                <TableCell width='20%'>Username</TableCell>
                <TableCell
                    width='20%'
                    align='right'
                >
                    User ID
                </TableCell>
                <TableCell
                    width='20%'
                    align='right'
                >
                    Role
                </TableCell>
                <TableCell
                    width='20%'
                    align='right'
                >
                    Email
                </TableCell>
                <TableCell
                    width='10%'
                    align='right'
                >
                    Tasks
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default UsersTableHead
