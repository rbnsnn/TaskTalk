import React, { useContext, useEffect } from 'react'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { SocketContext } from '../../helpers/socket/socket-context'
import LoadingPage from './LoadingPage'
import TaskDetails from '../../components/Tasks/TaskDetails/TaskDetails'

import { TaskEvent } from '../../types/task-event-enum.type'

const TaskDetailsPage: React.FC = () => {
    const socket: any = useContext(SocketContext)
    const { taskId } = useParams()
    const { data, loading, error, executeFetch } = useApi(`tasks/id/${taskId}`, 'GET')
    useEffect(() => {
        const dataHandle = async () => {
            await executeFetch()
        }

        socket.on(TaskEvent.SetTasks, dataHandle)

        return () => {
            socket.off(TaskEvent.SetTasks)
        }
    }, [socket, executeFetch])
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
