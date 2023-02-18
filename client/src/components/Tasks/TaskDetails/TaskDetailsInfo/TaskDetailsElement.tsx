import React from 'react'
import { Typography, Paper, Box, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
    caption: string
    children: React.ReactNode
    editable?: boolean
    flex?: number
}

const TaskDetailsElement: React.FC<Props> = ({
    caption,
    children,
    editable = false,
    flex = 1,
}) => {
    return (
        <Paper
            elevation={4}
            sx={{
                flex,
                maxWidth: '20%',
                minWidth: '300px',
                pt: 1,
                pb: 1,
                pl: 2,
                pr: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant='caption'>{caption}</Typography>
                {editable ? (
                    <Button size='small'>
                        <EditIcon sx={{ mr: 2 }} />
                        Edit
                    </Button>
                ) : (
                    <Box height='32px'></Box>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant='h5'
                    sx={{
                        mt: 1,
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                    }}
                >
                    {children}
                </Typography>
            </Box>
        </Paper>
    )
}

export default TaskDetailsElement
