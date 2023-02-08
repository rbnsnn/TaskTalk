import React from 'react'
import { Box, Paper, Typography, styled } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import TaskLabel from './TaskLabel'
import TaskTitle from './TaskRowTitle'
import { setPriorityColor } from '../../../helpers/setPriorityColor'

const TaskRowContainer = styled(Box)<{ priority: string }>(({ theme, priority }) => ({
    margin: '10px 0',
    height: '10%',
    opacity: 1,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'grab',
    borderTop: `5px solid ${priority}`,
    width: '95%',
}))

interface Props {
    index: number
    task: any
}

const TaskRow: React.FC<Props> = ({ index, task }) => {
    const priorityColor = setPriorityColor(task.priority)
    return (
        <Draggable
            key={task.taskId}
            draggableId={task.taskId}
            index={index}
        >
            {(provided, snapshot) => (
                <TaskRowContainer
                    priority={priorityColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Paper
                        sx={{ width: '100%', p: 1 }}
                        elevation={snapshot.isDragging ? 12 : 6}
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
                </TaskRowContainer>
            )}
        </Draggable>
    )
}

export default TaskRow
