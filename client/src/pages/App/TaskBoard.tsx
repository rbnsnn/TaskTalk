import { Box, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TaskBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { useOutletContext } from 'react-router-dom'

const TaskBoard: React.FC = () => {
    const socket: any = useOutletContext()
    const [data, setData] = useState<ColumnData[]>([])

    useEffect(() => {
        socket.emit('get_tasks')
        const dataHandle = (socketData: any) => {
            setData(socketData)
        }
        socket.on('get_tasks', dataHandle)
        return () => {
            socket.off('get_tasks', dataHandle)
        }
    }, [socket])

    const handleDrop = (target: any, item: any) => {
        setData((data) => {
            const dataAfterUpdate = data.map((column) => {
                if (column.id === target) {
                    const exists = column.tasks.find((task) => task.taskId! === item.id)
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
                        tasks: column.tasks.filter((task) => task.taskId !== item.id),
                    }
                    return updatedColumn
                }
            })
            return [...dataAfterUpdate]
        })
    }

    const addColumnHandle = (): void => {
        socket.emit('create_column')
    }

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

            <AddTask />

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
