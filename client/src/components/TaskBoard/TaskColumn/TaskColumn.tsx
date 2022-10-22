import React, { useState } from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'

const taskData = [
    {
        id: '1',
        name: 'test',
        tasks: [
            {
                id: 'a',
                title: 'chuj',
            },
            {
                id: 'b',
                title: 'cipa',
            },
        ],
    },
    {
        id: '2',
        name: 'test',
        tasks: [
            {
                id: 'c',
                title: 'dupa',
            },
        ],
    },
]

const TaskColumn: React.FC = () => {
    const [data, setData] = useState(taskData)
    return (
        <Card>
            <ColumnTitle />
            <Divider />
            <CardContent>
                {data.map((column) => (
                    <TaskRow />
                ))}
            </CardContent>
        </Card>
    )
}

export default TaskColumn
