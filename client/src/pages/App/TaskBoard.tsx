import { Box } from '@mui/material'
import React from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn'

const TaskBoard: React.FC = () => {
    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='5%'
            width='100%'
            height='100%'
        >
            <TaskColumn />
            <TaskColumn />
        </Box>
    )
}

export default TaskBoard
