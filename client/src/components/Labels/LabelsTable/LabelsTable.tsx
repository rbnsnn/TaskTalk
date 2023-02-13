import React from 'react'
import { Paper, Box, Table, TableBody, TableContainer } from '@mui/material'

import LabelsTableHead from './LabelsTableHead'

const LabelsTable: React.FC = () => {
    return (
        <Box
            sx={{
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
            }}
        >
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

                    <TableBody />
                    {/* {searchValue ? filteredTasksData : tasksData}
                        
                    </TableBody> */}
                </Table>
            </TableContainer>
        </Box>
    )
}

export default LabelsTable
