import React from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import { useDrop } from 'react-dnd'
import { TaskData } from '../../../types/task-data.type'

interface Props {
    data: any
    columns: number
    onDrop: (data: any, name: string, item: any) => void
}

const TaskColumn: React.FC<Props> = ({ data, onDrop, columns }) => {
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
        </Card>
    )
}

export default TaskColumn
