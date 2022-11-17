import React, { useState } from 'react'
import { Button } from '@mui/material'
import AddTaskDialog from './AddTaskDialog'

const AddTask: React.FC = () => {
    const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false)
    const handleClose = (): void => {
        setAddTaskOpen(false)
    }

    const handleOpen = (): void => {
        setAddTaskOpen(true)
    }

    const addTaskHandle = (): void => {}

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                    mb: 2,
                    ml: 2,
                    mt: 2,
                }}
            >
                Add Task
            </Button>
            <AddTaskDialog
                open={addTaskOpen}
                close={handleClose}
            />
        </>
    )
}

export default AddTask
