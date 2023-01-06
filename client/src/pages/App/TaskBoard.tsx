import { Box } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import TaskColumn from '../../components/TaskBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TaskBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import AddColumn from '../../components/TaskBoard/TaskColumn/AddColumn'

const TaskBoard: React.FC = () => {
    const socket: any = useContext(SocketContext)
    const [data, setData] = useState<ColumnData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
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

    return (
        <Box
            width='100%'
            height='100%'
        >
            {!loading && (
                <>
                    <AddColumn />
                    <AddTask data={data} />

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
