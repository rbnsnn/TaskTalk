import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'


interface Props {
    handleOpen: () => void
}

const UsersTableTittle: React.FC<Props> = ({ handleOpen }) => {
    const { companyName } = useSelector((state: RootState) => state.auth.user)

    return (
        <Box
            p={4}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
        >
            <Typography

                variant='h4'
                component='p'
            >
                {companyName} users
            </Typography>

            <Button
                variant='contained'
                size='large'
                onClick={handleOpen}
            >
                Add User
            </Button>
        </Box>
    )
}

export default UsersTableTittle