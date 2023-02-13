import React, { useState } from 'react'
import { Box } from '@mui/material'
import LabelsTable from './LabelsTable/LabelsTable'

const LabelsManager: React.FC = () => {
    return (
        <Box>
            <LabelsTable />
        </Box>
    )
}

export default LabelsManager
