import React from 'react'
import { Typography, Box } from '@mui/material'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import TasksTableSearch from './TasksTableSearch'
import TaskAdd from '../TaskAdd/TaskAdd'
import TasksColumnAdd from '../TasksBoard/TasksColumn/TasksColumnAdd'

interface Props {
    dispatch: any
    setSearchValue: any
    columns: boolean
}

const TasksTableTitle: React.FC<Props> = ({ dispatch, setSearchValue, columns }) => {
    const { companyName } = useAppSelector((state: RootState) => state.auth.user)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: 'search', value: e.target.value.toLowerCase() })
        setSearchValue(e.target.value)
    }

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
                {companyName} tasks
            </Typography>
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
            >
                <TasksTableSearch onChange={handleSearchChange} />
                <TasksColumnAdd />
                <TaskAdd disabled={!columns} />
            </Box>
        </Box>
    )
}

export default TasksTableTitle
