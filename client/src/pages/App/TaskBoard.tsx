import { Box, Button } from '@mui/material'
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
                    title: 'task1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    priority: 'high',
                    labels: ['tag1'],
                    assigned: ['user1'],
                },
                {
                    id: 'b',
                    title: 'task2',
                    priority: 'low',
                    labels: ['tag1', 'tag2'],
                    assigned: ['user2'],
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
                    priority: 'medium',
                    labels: ['tag1', 'tag2'],
                    assigned: ['user2'],
                },
            ],
        },
        {
            id: '3',
            name: 'test3',
            color: '#ff9100',
            tasks: [],
        },
        {
            id: '4',
            name: 'test4',
            color: '#ff9100',
            tasks: [],
        },
        {
            id: '5',
            name: 'test5',
            color: '#ff9100',
            tasks: [],
        },
    ])

    const handleDrop = (target: any, item: any) => {
        setData((data) => {
            const dataAfterUpdate = data.map((column) => {
                if (column.id === target) {
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

    const addColumnHandle = (): void => {
        const newColumn = [
            ...data,
            {
                id: '3',
                name: 'undefined',
                color: '#ff9100',
                tasks: [],
            },
        ]
        setData(newColumn)
    }

    const addTaskHandle = (): void => {}

    return (
        <Box
            width='100%'
            height='100%'
        >
            <Button
                onClick={addColumnHandle}
                variant='contained'
                sx={{
                    mb: 2,
                    mt: 2,
                }}
            >
                Add Column
            </Button>
            <Button
                onClick={addTaskHandle}
                variant='contained'
                sx={{
                    mb: 2,
                    ml: 2,
                    mt: 2,
                }}
            >
                Add Task
            </Button>

            <Box
                display='flex'
                flexDirection='row'
                justifyItems='center'
                gap='10px'
                height='90%'
                pb={-2}
            >
                {data.map((column) => (
                    <TaskColumn
                        key={column.id}
                        data={column}
                        onDrop={handleDrop}
                        columns={data.length}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default TaskBoard
