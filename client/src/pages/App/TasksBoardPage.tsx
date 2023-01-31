import { Box } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import TaskColumn from '../../components/TasksBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TasksBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import AddColumn from '../../components/TasksBoard/TaskColumn/AddColumn'
import { TaskData } from '../../types/task-data.type'

const TasksBoard: React.FC = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDrop = (target: string, columnName: string, item: TaskData) => {
        if (item.assignedColumn === target) {
            return
        } else {
            const taskToChange = {
                taskId: item.taskId,
                assignedColumn: item.assignedColumn,
            }
            socket.emit('task_change', { target, columnName, taskToChange })
        }
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

export default TasksBoard
