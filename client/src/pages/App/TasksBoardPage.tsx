import { Box, Typography, Slide } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
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

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return
        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            })
        }
    }

    return (
        <Slide
            direction='down'
            in={true}
        >
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
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
                                        <Droppable
                                            key={column.columnId}
                                            droppableId={column.columnId}
                                        >
                                            {(provided, snapshot) => (
                                                <TaskColumn
                                                    key={column.columnId}
                                                    data={column}
                                                    columns={columns.length}
                                                />
                                            )}
                                        </Droppable>
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
            </DragDropContext>
        </Slide>
    )
}

export default TasksBoard
