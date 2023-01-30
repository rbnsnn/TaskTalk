import React from 'react'
import { useParams } from 'react-router-dom'
// import { useApi } from '../../hooks/useApi'

const TaskPage = () => {
    const { taskId } = useParams()
    // const { data, error, loading } = useApi(`tasks/id/${taskId}`, 'GET')
    return <div>Task id: {taskId} </div>
}

export default TaskPage
