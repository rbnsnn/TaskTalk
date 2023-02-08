import React, { useContext } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material'
import { useInput } from '../../../../hooks/useInput'
import { isEqual } from '../../../../helpers/formHelper'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../../types/task-event-enum.type'

interface Props {
    open: boolean
    close: () => void
    name: string
    columnId: string
}

const TasksColumnDeleteDialog: React.FC<Props> = ({ open, close, name, columnId }) => {
    const socket: any = useContext(SocketContext)
    const handleDelete = (): void => {
        socket.emit(TaskEvent.DeleteColumn, columnId)
        close()
    }
    const {
        value: confirmationValue,
        isValid: confirmationIsValid,
        valueChangeHandler: confirmationChangeHandler,
        inputBlurHandler: confirmationBlurHandler,
        reset: confirmationReset,
    } = useInput(isEqual(name))

    const handleClose = (): void => {
        confirmationReset()
        close()
    }

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Are you absolutely sure?</DialogTitle>
            <DialogContent>
                <DialogContentText
                    align='center'
                    id='dlete-confirmation-text'
                >
                    This action cannot be undone and will permanently delete the
                    <b> {name}</b> column with all tasks assigned to it
                </DialogContentText>
                <DialogContentText
                    align='center'
                    id='dlete-confirmation-conditions'
                    mt={3}
                >
                    Please type <b>{name}</b> to confirm.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin='normal'
                    id='confirm'
                    label='Confirm'
                    variant={'outlined' as any}
                    value={confirmationValue}
                    fullWidth
                    onChange={(e) => confirmationChangeHandler(e)}
                    onBlur={(e) => confirmationBlurHandler(e)}
                />
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
                    disabled={!confirmationIsValid}
                    variant='contained'
                    size='large'
                    onClick={handleDelete}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TasksColumnDeleteDialog
