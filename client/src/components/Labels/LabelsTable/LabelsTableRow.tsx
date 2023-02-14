import React from 'react'
import { TableRow, TableCell, Typography, Button } from '@mui/material'
import { LabelI } from '../../../types/task-label.type'
import Label from '../Label'

interface Props {
    label: LabelI
}

const LabelsTableRow: React.FC<Props> = ({ label }) => {
    return (
        <TableRow hover>
            <TableCell>
                <Label
                    label={label.label}
                    color={label.color}
                />
            </TableCell>
            <TableCell>
                <Typography>{label.description}</Typography>
            </TableCell>
            <TableCell>0</TableCell>
            <TableCell align='center'>
                <Button size='small'>Edit</Button>
            </TableCell>
            <TableCell align='center'>
                <Button
                    size='small'
                    color='error'
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default LabelsTableRow
