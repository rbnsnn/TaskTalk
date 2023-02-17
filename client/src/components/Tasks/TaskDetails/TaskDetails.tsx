import React from 'react'
import { Slide, Box } from '@mui/material'
import { TaskData } from '../../../types/task-data.type'

interface Props {
    data: TaskData
}

const TaskDetails: React.FC<Props> = ({ data }) => {
    return (
        <Slide
            direction='down'
            in={true}
        >
            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {data.taskId}
                {data.title}
            </Box>
        </Slide>
    )
}

export default TaskDetails
