import React, { useState } from 'react'
import { Card, Box, Collapse, CardContent, Divider, Typography } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import { Draggable } from 'react-beautiful-dnd'
import { TaskData } from '../../../types/task-data.type'
import DeleteColumnDialog from './DeleteColumnDialog'

interface Props {
    ref?: any
    data: any
    columns: number
}

const TaskColumn: React.FC<Props> = ({ data, columns }) => {
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
        <Card
            elevation={2}
            sx={{
                width: 100 / columns + '%',
                maxWidth: 600,
                height: 'max-content',
            }}
        >
            <ColumnTitle
                name={data.name}
                columnId={data.columnId}
                count={data.tasks.length}
                deleteDialogOpen={handleDeleteDialogOpen}
                menuOpen={menuOpen}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
            />
            <Divider />

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
            >
                {!data.tasks.length && (
                    <Typography
                        sx={{
                            m: 2,
                        }}
                        color='text.disabled'
                    >
                        Drop task here...
                    </Typography>
                )}
                {data.tasks.map((task: any, index: number) => (
                    <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                    >
                        {(provided) => (
                            <TaskRow
                                index={index}
                                key={task.taskId}
                                task={task}
                            />
                        )}
                    </Draggable>
                ))}
            </CardContent>
            {/* <Collapse in={isActive && !isOrigin}>
                <Box height='50px'></Box>
            </Collapse> */}
            <DeleteColumnDialog
                open={deleteDialogOpen}
                close={handleDeleteDialogClose}
                name={data.name}
                columnId={data.columnId}
            />
        </Card>
    )
}

export default TaskColumn
