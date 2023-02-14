import React, { useState } from 'react'
import { Box } from '@mui/material'
import LabelsTable from './LabelsTable/LabelsTable'
import { LabelI } from '../../types/task-label.type'

interface Props {
    data: LabelI[]
}

const LabelsManager: React.FC<Props> = ({ data }) => {
    return (
        <Box>
            <LabelsTable data={data} />
        </Box>
    )
}

export default LabelsManager
