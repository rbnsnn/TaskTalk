import React, { useEffect, useContext } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,
    CircularProgress,
} from '@mui/material'
import { useApi } from '../../../hooks/useApi'
import { LabelI } from '../../../types/task-label.type'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../types/task-event-enum.type'
import Label from '../Label'

interface Props {
    open: boolean
    label: LabelI
    handleClose: () => void
}
const LabelDeleteDialog: React.FC<Props> = ({ open, label, handleClose }) => {
    const socket: any = useContext(SocketContext)
    const { success, loading, error, executeFetch } = useApi(
        `companies/labels/${label.label}`,
        'DELETE',
        false
    )

    const handleDelete = async (): Promise<void> => {
        await executeFetch()
        socket.emit(TaskEvent.LabelUpdate)
    }

    useEffect(() => {
        if (!success) {
            return
        }
        const labelDeleted = setTimeout(() => {
            handleClose()
        }, 1000)

        return () => {
            clearTimeout(labelDeleted)
        }
    }, [handleClose, success])

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                Delete label:
                <Label
                    label={label.label}
                    color={label.color}
                />
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete label?
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                {error && <Alert severity='error'>{error}</Alert>}
                {success && <Alert severity='success'>Label deleted successfully!</Alert>}
                {loading && <CircularProgress />}
                {!success && (
                    <>
                        <Button
                            onClick={handleClose}
                            variant='contained'
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            autoFocus
                            variant='contained'
                            color='error'
                        >
                            Delete
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default LabelDeleteDialog
