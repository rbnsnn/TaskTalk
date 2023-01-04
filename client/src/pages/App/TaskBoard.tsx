import { Box, Button } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TaskBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'

const TaskBoard: React.FC = () => {
    const socket: any = useContext(SocketContext)
    const [data, setData] = useState<ColumnData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        console.log(socket)
        socket.emit(TaskEvent.GetTasks)
        setLoading(true)
        const dataHandle = (socketData: any) => {
            setData(socketData)
            setLoading(false)
        }
        socket.on(TaskEvent.SetTasks, dataHandle)
        return () => {
            socket.off(TaskEvent.SetTasks)
        }
    }, [socket])

    const handleDrop = (target: any, item: any) => {
        setData((data) => {
            const dataAfterUpdate = data.map((column) => {
                if (column.columnId === target) {
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
            {!loading && (
                <>
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

                    {data.length ? (
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
                                    key={column.columnId}
                                    data={column}
                                    onDrop={handleDrop}
                                    columns={data.length}
                                />
                            ))}
                        </Box>
                    ) : (
                        <div>no tasks found!</div>
                    )}
                </>
            )}
            {loading && <div>loading</div>}
        </Box>
    )
}

export default TaskBoard
