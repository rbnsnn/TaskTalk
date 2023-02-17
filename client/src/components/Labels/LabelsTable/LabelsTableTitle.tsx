import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import LabelAdd from '../LabelAdd/LabelAdd'

interface Props {
    handleUpdate: () => void
}

const LabelsTableTitle: React.FC<Props> = ({ handleUpdate }) => {
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
                variant='h5'
                component='p'
            >
                {companyName} labels manager
            </Typography>
            <LabelAdd handleUpdate={handleUpdate} />
        </Box>
    )
}

export default LabelsTableTitle
