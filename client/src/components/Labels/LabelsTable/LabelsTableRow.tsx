import React from 'react'
import { TableRow, TableCell, Typography } from '@mui/material'
import { LabelI } from '../../../types/task-label.type'
import Label from '../Label'
import LabelDelete from '../LabelDelete/LabelDelete'
import LabelEdit from '../LabelEdit/LabelEdit'

interface Props {
    label: LabelI
    handleUpdate: () => void
}

const LabelsTableRow: React.FC<Props> = ({ label, handleUpdate }) => {
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
                <LabelEdit
                    handleUpdate={handleUpdate}
                    label={label}
                />
            </TableCell>
            <TableCell align='center'>
                <LabelDelete
                    label={label}
                    handleUpdate={handleUpdate}
                />
            </TableCell>
        </TableRow>
    )
}

export default LabelsTableRow
