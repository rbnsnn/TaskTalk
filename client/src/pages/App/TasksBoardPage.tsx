import { Box, Typography, Slide } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskColumn from '../../components/TasksBoard/TaskColumn/TaskColumn'
import AddTask from '../../components/TasksBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import AddColumn from '../../components/TasksBoard/TaskColumn/AddColumn'
import LoadingPage from '../LoadingPage'

const TasksBoard: React.FC = () => {
    console.log('render')
    const socket: any = useContext(SocketContext)
    const [columns, setColumns] = useState<ColumnData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        socket.emit(TaskEvent.GetTasks)
        const dataHandle = async (socketData: any) => {
            await setColumns(socketData)
            setLoading(false)
        }
        socket.on(TaskEvent.SetTasks, dataHandle)
        return () => {
            socket.off(TaskEvent.SetTasks)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDragEnd = (result: any, columns: ColumnData[], setColumns: any) => {
        if (!result.destination) return
        const { source, destination, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(
                (column) => column.columnId === source.droppableId
            )
            const destColumn = columns.find(
                (column) => column.columnId === destination.droppableId
            )

            if (sourceColumn && destColumn) {
                const sourceItems = [...sourceColumn.tasks]
                const destItems = [...destColumn.tasks]

                const [removed] = sourceItems.splice(source.index, 1)
                destItems.splice(destination.index, 0, removed)

                const newColumns = columns.map((column) => {
                    if (column.columnId === source.droppableId) {
                        return {
                            ...sourceColumn,
                            tasks: [...sourceItems],
                        }
                    } else if (column.columnId === destination.droppableId) {
                        return {
                            ...destColumn,
                            tasks: [...destItems],
                        }
                    } else
                        return {
                            ...column,
                        }
                })

                socket.emit('task_change', {
                    newColumns,
                    taskToChange: {
                        taskId: draggableId,
                        assignedColumn: destColumn.columnId,
                        status: destColumn.name,
                    },
                })
                setColumns(newColumns)
            }
        } else {
            const column = columns.find(
                (column) => column.columnId === source.droppableId
            )
            if (column) {
                const copiedItems = [...column.tasks]
                const [removed] = copiedItems.splice(source.index, 1)
                copiedItems.splice(destination.index, 0, removed)

                const newColumn = columns.map((column) => {
                    if (column.columnId === source.droppableId) {
                        return { ...column, tasks: copiedItems }
                    } else return column
                })
                setColumns(newColumn)
            }
        }
    }

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
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
                            <AddTask data={columns} />

                            {columns.length ? (
                                <Box
                                    display='flex'
                                    flexDirection='row'
                                    justifyContent='center'
                                    gap='10px'
                                    minWidth='100%'
                                    maxHeight='90%'
                                    pb={-2}
                                >
                                    {columns.map((column) => (
                                        <TaskColumn
                                            key={column.columnId}
                                            data={column}
                                            columns={columns.length}
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
        </DragDropContext>
    )
}

export default TasksBoard
