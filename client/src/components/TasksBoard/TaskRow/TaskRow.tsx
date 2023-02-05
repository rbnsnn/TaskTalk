import React, { useRef } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import type { XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import TaskLabel from './TaskLabel'
import TaskTitle from './TaskTitle'
import { setPriorityColor } from './setPriorityColor'

interface Props {
    index: number
    task: any
    handleMove: (
        hoverIndex: any,
        dragIndex: number,
        item: any,
        hoverColumn: string
    ) => void
    column: string
}

const TaskRow: React.FC<Props> = ({ index, task, handleMove, column }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'task',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const hoverColumn = column

            // Don't replace items with themselves

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            handleMove(hoverIndex, dragIndex, item, hoverColumn)
            // Time to actually perform the action

            // console.log(hoverColumn)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag(
        () => ({
            item: task,
            type: 'task',
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult()
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            options: {
                dropEffect: 'grabbing',
            },
        }),
        []
    )

    const priorityColor = setPriorityColor(task.priority)
    drag(drop(ref))
    return (
        <Paper
            ref={ref}
            elevation={6}
            sx={{
                mt: 1,
                mb: 1,
                p: 1,
                height: '10%',
                opacity: isDragging ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'grab',
                borderTop: `5px solid ${priorityColor}`,
                width: '100%',
            }}
        >
            <Box width='100%'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <TaskTitle
                        taskId={task.taskId}
                        columnId={task.assignedColumn}
                        title={task.title}
                        priority={task.priority}
                        assignedUsers={task.assignedUsers}
                    />
                </Box>
                <Box ml={1}>
                    <Typography fontSize='large'>{task.title}</Typography>
                </Box>
                <Box
                    mt={2}
                    ml={1}
                >
                    <Typography
                        fontSize='small'
                        sx={{
                            wordWrap: 'break-word',
                        }}
                    >
                        {task.description}
                    </Typography>
                </Box>
                {task.labels.map((label: string) => (
                    <TaskLabel
                        key={label}
                        label={label}
                    />
                ))}
            </Box>
        </Paper>
    )
}

export default TaskRow
