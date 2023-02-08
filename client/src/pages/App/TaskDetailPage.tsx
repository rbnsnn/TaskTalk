import React from 'react'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import LoadingPage from './LoadingPage'
import TaskDetails from '../../components/Tasks/TaskDetails/TaskDetails'

const TaskDetailPage: React.FC = () => {
    const { taskId } = useParams()
    const { data, loading } = useApi(`tasks/id/${taskId}`, 'GET')

    return (
        <>
            {!loading && (
                <>
                    {data.length ? (
                        <TaskDetails />
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

export default TaskDetailPage
