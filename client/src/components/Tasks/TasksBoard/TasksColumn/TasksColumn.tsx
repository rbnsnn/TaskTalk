import React, { useState } from 'react'
import { Card, CardContent, Divider, Box, styled } from '@mui/material'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TasksColumnTitle from './TasksColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import TasksDeleteColumnDialog from './TasksColumnDeleteDialog'
import { ColumnData } from '../../../../types/column-data.type'

const StyledCardContent = styled(CardContent)<{ dragging: string | null | undefined }>(
    ({ theme, dragging }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '77vh',
        overflow: 'auto',
        boxShadow: dragging
            ? theme.palette.mode === 'dark'
                ? 'inset 0 0 0 20em rgba(255, 255, 255, 0.05)'
                : 'inset 0 0 0 20em rgba(0, 0, 0, 0.05)'
            : '',

        transition: 'box-shadow 0.3s ease-in-out',
    })
)

interface Props {
    data: ColumnData
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

    const [columnColor, setColumnColor] = useState<string>(data.color)

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
                            setColumnColor={setColumnColor}
                            column={data}
                            columnColor={columnColor}
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
                                <Box
                                    sx={{
                                        boxShadow: columnColor
                                            ? `0px 0px 100px -70px ${columnColor} inset`
                                            : '',
                                    }}
                                >
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
                                </Box>
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
