import React from 'react'
import { Box, IconButton, Avatar, Typography, Chip } from '@mui/material'
import { Priority } from '../../../types/priority-enum'
import { setPriorityColor } from './setPriorityColor'

interface Props {
    id: string
    priority: Priority
}

const TaskTitle: React.FC<Props> = ({ id, priority }) => {
    const priorityColor = setPriorityColor(priority)

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            width='100%'
        >
            <IconButton>
                <Avatar
                    sx={{
                        width: '18px',
                        height: '18px',
                        fontSize: '16px',
                        bgcolor: 'orange',
                    }}
                >
                    u
                </Avatar>
            </IconButton>
            <Typography
                ml={1}
                display='inline'
                fontSize='small'
            >
                {id}
            </Typography>
            <Chip
                label={priority}
                size='small'
                sx={{
                    ml: 'auto',
                    backgroundColor: priorityColor,
                    color: 'white',
                }}
            />
        </Box>
    )
}

export default TaskTitle
