import { Box, Typography, Slide } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskColumn from '../../components/TasksBoard/TasksColumn/TasksColumn'
import AddTask from '../../components/TasksBoard/AddTask/AddTask'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import AddColumn from '../../components/TasksBoard/TasksColumn/TasksColumnAdd'
import LoadingPage from '../LoadingPage'
import { onDragEnd } from '../../helpers/TasksBoard/onDragEnd'

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

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns, socket)}
        >
            {!loading && (
                <Slide
                    direction='down'
                    in={true}
                >
                    <Box
                        width='100%'
                        height='100%'
                    >
                        <AddColumn />
                        <AddTask data={columns} />

                        {columns.length ? (
                            <Droppable
                                droppableId='board'
                                type='COLUMN'
                                direction='horizontal'
                            >
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        display='flex'
                                        flexDirection='row'
                                        justifyContent='flex-start'
                                        maxWidth='100%'
                                        maxHeight='90%'
                                        pb={-2}
                                    >
                                        {columns.map((column, index) => (
                                            <TaskColumn
                                                key={column.columnId}
                                                data={column}
                                                index={index}
                                                columns={columns.length}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        ) : (
                            <Typography
                                align='center'
                                variant='h4'
                            >
                                No tasks found!
                            </Typography>
                        )}
                    </Box>
                </Slide>
            )}
            {loading && <LoadingPage />}
        </DragDropContext>
    )
}

export default TasksBoard
