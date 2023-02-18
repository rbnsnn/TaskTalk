import React from 'react'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import LoadingPage from './LoadingPage'
import TaskDetails from '../../components/Tasks/TaskDetails/TaskDetails'

const TaskDetailsPage: React.FC = () => {
    const { taskId } = useParams()
    const { data, loading, error } = useApi(`tasks/id/${taskId}`, 'GET')

    return (
        <>
            {data ? (
                <TaskDetails data={data} />
            ) : (
                <Typography
                    align='center'
                    variant='h5'
                >
                    {error && error}
                </Typography>
            )}

            {loading && <LoadingPage />}
        </>
    )
}

export default TaskDetailsPage
