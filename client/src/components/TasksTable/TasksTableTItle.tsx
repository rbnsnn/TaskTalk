import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'
import TasksTableSearch from './TasksTableSearch'

interface Props {
    handleOpen: () => void
    dispatch: any
    setSearchValue: any
}

const TasksTableTitle: React.FC<Props> = ({ handleOpen, dispatch, setSearchValue }) => {
    const { companyName } = useAppSelector((state: RootState) => state.auth.user)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: 'search', value: e.target.value.toLowerCase() })
        setSearchValue(e.target.value)
    }

    return (
        <Box
            p={4}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            sx={{
                width: { xs: '95%', sm: '100%', xl: '85%' },
            }}
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
                <TasksTableSearch onChange={handleSearchChange} />

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
