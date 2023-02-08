import React from 'react'
import { useTasksTableHandler } from '../../hooks/useTasksTableHandler'
import { Typography } from '@mui/material'
import TasksTable from '../../components/Tasks/TasksTable/TasksTable'
import LoadingPage from './LoadingPage'
import { getTextContrast } from '../../helpers/getTextContrast'

const TasksTablePage: React.FC = () => {
    const { state, loading, dispatch } = useTasksTableHandler()
    console.log(getTextContrast('ffffffff'))
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
