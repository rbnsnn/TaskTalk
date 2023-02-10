import React, { useState } from 'react'
import { Button } from '@mui/material'
import LabelIcon from '@mui/icons-material/Label'
import TaskLabelsManager from './TaskLabelsManager'

const TaskLabelsEdit: React.FC = () => {
    const [labelsManagerOpen, setLabelsManagerOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setLabelsManagerOpen(false)
    }

    const handleOpen = (): void => {
        setLabelsManagerOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                    ml: 2,
                }}
            >
                <LabelIcon sx={{ mr: 2 }} />
                Manage Labels
            </Button>
            {labelsManagerOpen && (
                <TaskLabelsManager
                    open={labelsManagerOpen}
                    close={handleClose}
                />
            )}
        </>
    )
}

export default TaskLabelsEdit
