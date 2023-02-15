import React from 'react'
import {
    Paper,
    Box,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Typography,
    Slide,
} from '@mui/material'
import { LabelI } from '../../../types/task-label.type'
import LabelsTableHead from './LabelsTableHead'
import LabelsTableRow from './LabelsTableRow'
import LabelsTableTitle from './LabelsTableTitle'

interface Props {
    data: LabelI[]
    handleUpdate: () => void
}

const LabelsTable: React.FC<Props> = ({ data, handleUpdate }) => {
    const labelsNotFound = (
        <TableRow>
            <TableCell colSpan={6}>
                <Typography textAlign='center'>No labels found</Typography>
            </TableCell>
        </TableRow>
    )

    const LabelsData = data.length
        ? data.map((label: LabelI) => (
              <LabelsTableRow
                  key={label.label}
                  label={label}
                  handleUpdate={handleUpdate}
              />
          ))
        : labelsNotFound

    return (
        <Slide
            direction='down'
            in={true}
        >
            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <LabelsTableTitle handleUpdate={handleUpdate} />
                <TableContainer
                    component={Paper}
                    sx={{
                        margin: '0 auto',
                        maxHeight: '75vh',
                        maxWidth: { xs: '95%', sm: '100%', xl: '85%' },
                    }}
                >
                    <Table
                        stickyHeader
                        sx={{ minWidth: 700 }}
                    >
                        <LabelsTableHead
                        // data={state}
                        // dispatch={dispatch}
                        />

                        <TableBody>{LabelsData}</TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Slide>
    )
}

export default LabelsTable
