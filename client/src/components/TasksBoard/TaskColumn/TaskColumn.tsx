import React, { useState } from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'

import DeleteColumnDialog from './DeleteColumnDialog'
import { Box } from '@mui/system'

interface Props {
    data: any
    index: number
    columns: number
}

const TaskColumn: React.FC<Props> = ({ data, index, columns }) => {
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
                        margin: '20px 0px 0px 40px',
                        height: 'max-content',
                    }}
                >
                    <Card elevation={2}>
                        <ColumnTitle
                            dragHandle={provided.dragHandleProps}
                            name={data.name}
                            columnId={data.columnId}
                            count={data.tasks.length}
                            deleteDialogOpen={handleDeleteDialogOpen}
                            menuOpen={menuOpen}
                            handleMenuOpen={handleMenuOpen}
                            handleMenuClose={handleMenuClose}
                        />
                        <Divider />
                        <Droppable
                            key={data.columnId}
                            droppableId={data.columnId}
                        >
                            {(provided, snapshot) => (
                                <CardContent
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        maxHeight: '77vh',
                                        overflow: 'auto',
                                    }}
                                >
                                    {data.tasks.map((task: any, index: number) => (
                                        <TaskRow
                                            index={index}
                                            key={task.taskId}
                                            task={task}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </CardContent>
                            )}
                        </Droppable>
                        <DeleteColumnDialog
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

export default TaskColumn
