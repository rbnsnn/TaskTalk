import React from 'react'

import TasksTable from '../../components/TasksTable/TasksTable'
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
                        <TasksTable
                            state={state}
                            dispatch={dispatch}
                        />
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
