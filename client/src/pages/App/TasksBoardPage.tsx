import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Typography, Slide } from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'
import { ColumnData } from '../../types/column-data.type'
import { TaskEvent } from '../../types/task-event-enum.type'
import { SocketContext } from '../../helpers/socket/socket-context'
import { onDragEnd } from '../../helpers/TasksBoard/onDragEnd'
import TaskAdd from '../../components/Tasks/TaskAdd/TaskAdd'
import TasksColumnAdd from '../../components/Tasks/TasksBoard/TasksColumn/TasksColumnAdd'
import TasksBoard from '../../components/Tasks/TasksBoard/TasksBoard'
import LoadingPage from './LoadingPage'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const TasksBoardPage: React.FC = () => {
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
                        <TasksColumnAdd />
                        <TaskAdd disabled={Boolean(!columns.length)} />
                        <Button
                            // onClick={handleOpen}
                            variant='contained'
                            sx={{
                                ml: 2,
                            }}
                        >
                            <BookmarkIcon sx={{ mr: 2 }} />
                            Manage Labels
                        </Button>

                        {columns.length ? (
                            <TasksBoard columns={columns} />
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

export default TasksBoardPage
