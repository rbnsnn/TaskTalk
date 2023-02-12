import React from 'react'
import { useTasksTableHandler } from '../../hooks/useTasksTableHandler'
import { Typography } from '@mui/material'
import TasksTable from '../../components/Tasks/TasksTable/TasksTable'
import LoadingPage from './LoadingPage'

const TasksTablePage: React.FC = () => {
    const { state, columns, loading, dispatch } = useTasksTableHandler()

    return (
        <>
            {!loading && (
                <>
                    {state.data.length ? (
                        <TasksTable
                            state={state}
                            columns={columns}
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
