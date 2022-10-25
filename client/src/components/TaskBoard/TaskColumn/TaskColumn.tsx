import React from 'react'
import { Card, CardContent, Divider } from '@mui/material'
import ColumnTitle from './ColumnTitle'
import TaskRow from '../TaskRow/TaskRow'
import { useDrop } from 'react-dnd'

interface Props {
    data: any
    onDrop: (data: any, item: any) => void
}

const TaskColumn: React.FC<Props> = ({ data, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => {
            onDrop(data.name, item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    return (
        <Card ref={drop}>
            <ColumnTitle
                name={data.name}
                count={data.tasks.length}
            />
            <Divider />
            <CardContent>
                {data.tasks.map((task: any) => (
                    <TaskRow
                        key={task.id}
                        task={task}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

export default TaskColumn
