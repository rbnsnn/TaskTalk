import React from 'react'
import { useTasksTableHandler } from '../../hooks/useTasksTableHandler'
import TasksTable from '../../components/Tasks/TasksTable/TasksTable'
import LoadingPage from './LoadingPage'

const TasksTablePage: React.FC = () => {
    const { state, columns, loading, dispatch } = useTasksTableHandler()

    return (
        <>
            {!loading && (
                <TasksTable
                    state={state}
                    columns={columns}
                    dispatch={dispatch}
                />
            )}
            {loading && <LoadingPage />}
        </>
    )
}

export default TasksTablePage
