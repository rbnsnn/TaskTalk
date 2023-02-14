import React from 'react'
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material'

const LabelsTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    width='30%'
                    align='left'
                >
                    <TableSortLabel>Label</TableSortLabel>
                </TableCell>
                <TableCell
                    width='40%'
                    align='left'
                >
                    Description
                </TableCell>
                <TableCell
                    width='20%'
                    align='left'
                >
                    Active
                </TableCell>
                <TableCell
                    width='5%'
                    align='center'
                ></TableCell>
                <TableCell
                    width='5%'
                    align='center'
                ></TableCell>
            </TableRow>
        </TableHead>
    )
}

export default LabelsTableHead
