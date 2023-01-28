import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'

interface Props {
    handleOpen: () => void
}

const TaskTableTitle: React.FC<Props> = ({ handleOpen }) => {
    const { companyName } = useAppSelector((state: RootState) => state.auth.user)

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
                {companyName} tasks
            </Typography>

            <Button
                variant='contained'
                size='large'
                onClick={handleOpen}
            >
                Add task
            </Button>
        </Box>
    )
}

export default TaskTableTitle
