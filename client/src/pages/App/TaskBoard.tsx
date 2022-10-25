import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'

const TaskBoard: React.FC = () => {
    const [data, setData] = useState([
        {
            id: '1',
            name: 'test',
            color: '#f48fb1',
            tasks: [
                {
                    id: 'a',
                    title: 'task1',
                },
                {
                    id: 'b',
                    title: 'task2',
                },
            ],
        },
        {
            id: '2',
            name: 'test2',
            color: '#00b0ff',
            tasks: [
                {
                    id: 'c',
                    title: 'task3',
                },
            ],
        },
        {
            id: '3',
            name: 'test3',
            color: '#ff9100',
            tasks: [],
        },
    ])

    const handleDrop = (target: any, item: any) => {
        setData((data) => {
            const dataAfterUpdate = data.map((column) => {
                if (column.name === target) {
                    const exists = column.tasks.find((task) => task.id === item.id)
                    if (exists) {
                        return { ...column }
                    }
                    const updatedColumn = {
                        ...column,
                        tasks: [...column.tasks, item],
                    }

                    return updatedColumn
                } else {
                    const updatedColumn = {
                        ...column,
                        tasks: column.tasks.filter((task) => task.id !== item.id),
                    }
                    return updatedColumn
                }
            })
            return [...dataAfterUpdate]
        })
    }

    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            width='100%'
            height='100%'
            pb={-2}
        >
            {data.map((column) => (
                <TaskColumn
                    key={column.id}
                    data={column}
                    onDrop={handleDrop}
                />
            ))}
        </Box>
    )
}

export default TaskBoard
