import React, { useState } from 'react'
import { Button } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import TasksColumnAddDialog from './TasksColumnAddDialog'

const TasksColumnAdd: React.FC = () => {
    const [addColumnOpen, setAddColumnOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddColumnOpen(false)
    }

    const handleOpen = (): void => {
        setAddColumnOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                    mb: 2,
                    mt: 2,
                }}
            >
                <PostAddIcon sx={{ mr: 2 }} />
                Add Column
            </Button>
            <TasksColumnAddDialog
                open={addColumnOpen}
                close={handleClose}
            />
        </>
    )
}

export default TasksColumnAdd
