import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'

const TaskBoard: React.FC = () => {
    const [data, setData] = useState([
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
            name: 'test2',
            tasks: [
                {
                    id: 'c',
                    title: 'dupa',
                },
            ],
        },
        {
            id: '3',
            name: 'test3',
            tasks: [],
        },
    ])

    const handleDrop = (target: any, item: any) => {
        setData((data) => {
            const dataAfterUpdate = data.map((column) => {
                if (column.name === target) {
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
        // console.log(dataAfterUpdate)
    }

    console.log(data)
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
