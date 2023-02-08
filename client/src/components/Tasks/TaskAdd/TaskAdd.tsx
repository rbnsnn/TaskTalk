import React, { useState } from 'react'
import { Button } from '@mui/material'
import { ColumnData } from '../../../types/column-data.type'
import TaskAddDialog from './TaskAddDialog'
import AddTaskIcon from '@mui/icons-material/AddTask'

interface props {
    data: ColumnData[]
}

const TaskAdd: React.FC<props> = ({ data }) => {
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
                disabled={!data.length}
                variant='contained'
                sx={{
                    mb: 2,
                    ml: 2,
                    mt: 2,
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
