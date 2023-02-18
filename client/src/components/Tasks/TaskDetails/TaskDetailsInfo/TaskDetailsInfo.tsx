import React from 'react'
import { Box, Typography } from '@mui/material'
import { TaskData } from '../../../../types/task-data.type'
import TaskDetailsElement from './TaskDetailsElement'

interface Props {
    data: TaskData
}

const TaskDetailsInfo: React.FC<Props> = ({ data }) => {
    const date = new Date(data.created!).toLocaleString()
    return (
        <Box>
            <Typography
                variant='h4'
                mb={2}
            >
                {data.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box
                    sx={{
                        maxWidth: 'min-content',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <TaskDetailsElement
                        caption='description'
                        editable
                    >
                        {data.description}
                    </TaskDetailsElement>
                    <TaskDetailsElement
                        caption='Task ID'
                        flex={4}
                    >
                        {data.taskId}
                    </TaskDetailsElement>
                </Box>
                <Box
                    sx={{
                        maxWidth: 'min-content',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <TaskDetailsElement
                        caption='Priority'
                        editable
                    >
                        {data.priority}
                    </TaskDetailsElement>
                    <TaskDetailsElement
                        caption='Status'
                        editable
                    >
                        {data.status.name}
                    </TaskDetailsElement>
                    <TaskDetailsElement caption='Created by'>
                        {data.createdBy![0].username}
                    </TaskDetailsElement>
                    <TaskDetailsElement caption='Created'>{date}</TaskDetailsElement>
                </Box>
                <Box></Box>
            </Box>
        </Box>
    )
}

export default TaskDetailsInfo
