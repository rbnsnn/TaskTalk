import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import LabelAdd from '../LabelAdd/LabelAdd'

const LabelsTableTitle: React.FC = () => {
    const { companyName } = useAppSelector((state: RootState) => state.auth.user)
    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            mb={2}
            sx={{
                width: { xs: '95%', sm: '100%', xl: '85%' },
            }}
        >
            <Typography
                variant='h4'
                component='p'
            >
                {companyName} labels manager
            </Typography>
            <LabelAdd />
        </Box>
    )
}

export default LabelsTableTitle
