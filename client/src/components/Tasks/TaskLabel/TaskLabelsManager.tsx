import React, { useState } from 'react'
import {
    Alert,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from '@mui/material'
import TaskLabel from './TaskLabel'

interface Props {
    open: boolean
    close: () => void
}

const TaskLabelsManager: React.FC<Props> = ({ open, close }) => {
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleCancel = (): void => {
        close()
    }

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Labels Manager</DialogTitle>
            <DialogContent>
                <TaskLabel label='Enchancements' />
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                {error && <Alert severity='error'>{error}</Alert>}
                {success && <Alert severity='success'>Task created successfully!</Alert>}
                {loading && <CircularProgress />}

                {!success && (
                    <Button
                        color='error'
                        variant='contained'
                        size='large'
                        onClick={handleCancel}
                    >
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default TaskLabelsManager
