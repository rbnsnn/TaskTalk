import React, { useState } from 'react'
import { Button } from '@mui/material'
import TaskAddDialog from './TaskAddDialog'
import AddTaskIcon from '@mui/icons-material/AddTask'

interface props {
    disabled: boolean
}

const TaskAdd: React.FC<props> = ({ disabled }) => {
    const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddTaskOpen(false)
    }

    const handleOpen = (): void => {
        setAddTaskOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                disabled={disabled}
                variant='contained'
                sx={{
                    ml: 2,
                }}
            >
                <AddTaskIcon sx={{ mr: 2 }} />
                Add Task
            </Button>
            {addTaskOpen && (
                <TaskAddDialog
                    open={addTaskOpen}
                    close={handleClose}
                />
            )}
        </>
    )
}

export default TaskAdd
