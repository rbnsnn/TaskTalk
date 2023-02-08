import React, { useState } from 'react'
import { Card, CardContent, Divider, Box, styled } from '@mui/material'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TasksColumnTitle from './TasksColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import TasksDeleteColumnDialog from './TasksColumnDeleteDialog'

const StyledCardContent = styled(CardContent)<{ dragging: string | null | undefined }>(
    ({ theme, dragging }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '77vh',
        overflow: 'auto',
        boxShadow:
            dragging && theme.palette.mode === 'dark'
                ? 'inset 0 0 0 20em rgba(255, 255, 255, 0.1)'
                : 'inset 0 0 0 20em rgba(0, 0, 0, 0.1)',
    })
)

interface Props {
    data: any
    index: number
    columns: number
}

const TasksColumn: React.FC<Props> = ({ data, index, columns }) => {
    const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null)
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuOpen(event.currentTarget)
    }
    const handleMenuClose = (): void => {
        setMenuOpen(null)
    }

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const handleDeleteDialogOpen = (): void => {
        handleMenuClose()
        setDeleteDialogOpen(true)
    }
    const handleDeleteDialogClose = (): void => {
        setDeleteDialogOpen(false)
    }

    return (
        <Draggable
            draggableId={data.columnId}
            index={index}
        >
            {(provided, snapshot) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                        width: 100 / columns + '%',
                        maxWidth: '50%',
                        minWidth: 350,
                        margin: '20px 20px 0px 20px',
                        height: 'max-content',
                    }}
                >
                    <Card elevation={2}>
                        <TasksColumnTitle
                            dragHandle={provided.dragHandleProps}
                            name={data.name}
                            columnId={data.columnId}
                            count={data.tasks.length}
                            deleteDialogOpen={handleDeleteDialogOpen}
                            menuOpen={menuOpen}
                            handleMenuOpen={handleMenuOpen}
                            handleMenuClose={handleMenuClose}
                            snapshot={snapshot}
                        />
                        <Divider />
                        <Droppable
                            key={data.columnId}
                            droppableId={data.columnId}
                        >
                            {(provided, snapshot) => (
                                <StyledCardContent
                                    dragging={snapshot.draggingOverWith}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {data.tasks.map((task: any, index: number) => (
                                        <TaskRow
                                            index={index}
                                            key={task.taskId}
                                            task={task}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </StyledCardContent>
                            )}
                        </Droppable>
                        <TasksDeleteColumnDialog
                            open={deleteDialogOpen}
                            close={handleDeleteDialogClose}
                            name={data.name}
                            columnId={data.columnId}
                        />
                    </Card>
                </Box>
            )}
        </Draggable>
    )
}

export default TasksColumn
