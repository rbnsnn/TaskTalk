import React from 'react'
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material'

const TaskTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align='right'>Assigned to</TableCell>
                <TableCell
                    align='right'
                    sortDirection={'asc'}
                >
                    <TableSortLabel
                        active={true}
                        direction={'asc'}
                    >
                        Priority
                    </TableSortLabel>
                </TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>ID</TableCell>
                <TableCell align='right'>Created</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TaskTableHead
