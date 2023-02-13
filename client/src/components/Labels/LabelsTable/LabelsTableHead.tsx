import React from 'react'
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material'

const LabelsTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    width='35%'
                    align='left'
                >
                    <TableSortLabel>Label</TableSortLabel>
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                >
                    Description
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                >
                    Active
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                ></TableCell>
                <TableCell
                    width='13%'
                    align='right'
                ></TableCell>
            </TableRow>
        </TableHead>
    )
}

export default LabelsTableHead
