import React, { useState } from 'react'
import { Button } from '@mui/material'
import AddTaskDialog from './AddTaskDialog'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { ColumnData } from '../../../types/column-data.type'

interface props {
    data: ColumnData[]
}

const AddTask: React.FC<props> = ({ data }) => {
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
                <AddTaskDialog
                    open={addTaskOpen}
                    close={handleClose}
                />
            )}
        </>
    )
}

export default AddTask
