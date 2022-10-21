import { Box } from '@mui/material'
import React from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'

const tasks = [
    {
        name: 'First',
    },
]

const TaskBoard: React.FC = () => {
    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            width='100%'
            height='100%'
            pb={-2}
        >
            <TaskColumn />
            <TaskColumn />
        </Box>
    )
}

export default TaskBoard
