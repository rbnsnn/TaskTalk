import { Box, Typography, Slide } from '@mui/material'
import update from 'immutability-helper'
import React, { useState, useEffect, useContext } from 'react'
import TaskColumn from '../../components/TasksBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TasksBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import AddColumn from '../../components/TasksBoard/TaskColumn/AddColumn'
import { TaskData } from '../../types/task-data.type'
import LoadingPage from '../LoadingPage'

const TasksBoard: React.FC = () => {
    const socket: any = useContext(SocketContext)
    const [data, setData] = useState<ColumnData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        socket.emit(TaskEvent.GetTasks)
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

    const handleMove = (
        hoverIndex: any,
        dragIndex: number,
        item: any,
        hoverColumn: string
    ) => {
        setData((prevState) => {
            const coppiedStateArray = prevState.map((column) => {
                if (hoverColumn === item.assignedColumn) {
                    const prevItem = column.tasks.splice(hoverIndex, 1, item)

                    // remove item by "dragIndex" and put "prevItem" instead
                    column.tasks.splice(dragIndex, 1, prevItem[0])
                    console.log('up')
                    return column
                    // } else if (column.columnId === item.assignedColumn) {
                    //     column.tasks.splice(hoverIndex, 1)
                    //     return column
                } else {
                    return column
                }
            })
            // remove item by "hoverIndex" and put "dragItem" instead

            // remove item by "dragIndex" and put "prevItem" instead
            // coppiedStateArray.splice(dragIndex, 1, prevItem[0])
            // console.log(coppiedStateArray)
            return coppiedStateArray
        })
    }

    return (
        <Slide
            direction='down'
            in={true}
        >
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
                                justifyContent='center'
                                gap='10px'
                                minWidth='100%'
                                maxHeight='90%'
                                pb={-2}
                            >
                                {data.map((column) => (
                                    <TaskColumn
                                        key={column.columnId}
                                        data={column}
                                        onDrop={handleDrop}
                                        columns={data.length}
                                        handleMove={handleMove}
                                    />
                                ))}
                            </Box>
                        ) : (
                            <Typography
                                align='center'
                                variant='h4'
                            >
                                No tasks found!
                            </Typography>
                        )}
                    </>
                )}
                {loading && <LoadingPage />}
            </Box>
        </Slide>
    )
}

export default TasksBoard
