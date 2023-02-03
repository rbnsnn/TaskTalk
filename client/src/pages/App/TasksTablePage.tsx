import React from 'react'
import TasksTable from '../../components/TasksTable/TasksTable'
import { Box } from '@mui/system'
import { useTasksTableHandler } from '../../hooks/useTasksTableHandler'
import LoadingPage from '../LoadingPage'
import { Typography } from '@mui/material'

const TasksTablePage: React.FC = () => {
    const { state, loading, dispatch } = useTasksTableHandler()

    return (
        <>
            {!loading && (
                <>
                    {state.data.length ? (
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyItems='center'
                            gap='10px'
                            height='auto'
                            pb={-2}
                        >
                            <TasksTable
                                state={state}
                                dispatch={dispatch}
                            />
                        </Box>
                    ) : (
                        <Typography
                            align='center'
                            variant='h4'
                        >
                            No tasks found!
                        </Typography>
                    )}
                </>
            )}
            {loading && <LoadingPage />}
        </>
    )
}

export default TasksTablePage
