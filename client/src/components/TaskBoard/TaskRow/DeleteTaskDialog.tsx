import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'

interface Props {
    open: boolean
    title: string
    taskId: string
    handleClose: () => void
    handleDelete: () => void
}
const DeleteTaskDialog: React.FC<Props> = ({
    open,
    title,
    taskId,
    handleClose,
    handleDelete,
}) => {
    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle>
                Delete task: <b>{taskId}</b>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete task: <b>{title}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                <Button
                    color='error'
                    variant='contained'
                    size='large'
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    size='large'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTaskDialog
