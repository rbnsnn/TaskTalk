import React, { useState } from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import { useDrop } from 'react-dnd'
import { TaskData } from '../../../types/task-data.type'
import DeleteColumnDialog from './DeleteColumnDialog'

interface Props {
    data: any
    columns: number
    onDrop: (data: any, name: string, item: any) => void
}

const TaskColumn: React.FC<Props> = ({ data, onDrop, columns }) => {
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

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item: TaskData) => {
            onDrop(data.columnId, data.name, item)
        },
        canDrop: (item: TaskData) => data.columnId !== item.assignedColumn,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }))
    return (
        <Card
            ref={drop}
            elevation={isOver && canDrop ? 12 : 2}
            sx={{
                width: 100 / columns + '%',
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
            <CardContent>
                {data.tasks.map((task: any) => (
                    <TaskRow
                        key={task.taskId}
                        task={task}
                    />
                ))}
            </CardContent>
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
