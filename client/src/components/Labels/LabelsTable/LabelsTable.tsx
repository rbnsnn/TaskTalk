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
}

const LabelsTable: React.FC<Props> = ({ data }) => {
    const labelsNotFound = (
        <TableRow>
            <TableCell colSpan={6}>
                <Typography textAlign='center'>No tasks found</Typography>
            </TableCell>
        </TableRow>
    )

    const LabelsData = data.length
        ? data.map((label: LabelI) => (
              <LabelsTableRow
                  key={label.label}
                  label={label}
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
                <LabelsTableTitle />
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
