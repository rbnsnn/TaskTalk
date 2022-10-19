import React from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'

const TaskColumn: React.FC = () => {
    return (
        <Card>
            <ColumnTitle />
            <Divider />
            <CardContent>
                <TaskRow />
                <TaskRow />
                <TaskRow />
            </CardContent>
        </Card>
    )
}

export default TaskColumn
