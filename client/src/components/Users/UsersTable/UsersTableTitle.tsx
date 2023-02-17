import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

interface Props {
    handleOpen: () => void
}

const UsersTableTitle: React.FC<Props> = ({ handleOpen }) => {
    const { companyName } = useAppSelector((state: RootState) => state.auth.user)

    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            mb={2}
        >
            <Typography
                variant='h5'
                component='p'
            >
                {companyName} users
            </Typography>

            <Button
                variant='contained'
                size='large'
                onClick={handleOpen}
            >
                <PersonAddIcon sx={{ mr: 2 }} />
                Add User
            </Button>
        </Box>
    )
}

export default UsersTableTitle
