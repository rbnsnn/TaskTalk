import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'
import TasksTableSearch from './TasksTableSearch'

interface Props {
    handleOpen: () => void
}

const TasksTableTitle: React.FC<Props> = ({ handleOpen }) => {
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
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
            >
                <TasksTableSearch />

                <Button
                    variant='contained'
                    size='large'
                    onClick={handleOpen}
                >
                    Add task
                </Button>
            </Box>
        </Box>
    )
}

export default TasksTableTitle
