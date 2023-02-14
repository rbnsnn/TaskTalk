import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    DialogActions,
    Button,
    CircularProgress,
} from '@mui/material'
import { useInput } from '../../../../hooks/useInput'
import { isLongerThan } from '../../../../helpers/formHelper'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../../types/task-event-enum.type'

interface Props {
    open: boolean
    close: () => void
}
const TasksColumnAddDialog: React.FC<Props> = ({ open, close }) => {
    const socket: any = useContext(SocketContext)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleSocket = async (res: any) => {
        setLoading(true)
        setError(res.error)
        setSuccess(res.success)
        setLoading(false)
    }

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput(isLongerThan(4))

    const handleReset = useCallback((): void => {
        nameReset()
        setSuccess(false)
        setError(false)
        setLoading(false)
    }, [nameReset])

    const handleCancel = useCallback((): void => {
        close()
        setTimeout(() => handleReset(), 1000)
    }, [close, handleReset])

    let formIsValid = false

    if (nameIsValid) {
        formIsValid = true
    }

    const handleSubmit = (): void => {
        socket.emit(TaskEvent.CreateColumn, nameValue)
    }

    useEffect(() => {
        socket.on(TaskEvent.CreateColumn, async (res: any) => {
            await handleSocket(res)
        })
        if (!success) {
            return
        }
        const columnAdded = setTimeout(() => {
            handleCancel()
        }, 1000)

        return () => {
            clearTimeout(columnAdded)
            socket.off(TaskEvent.CreateColumn)
        }
    }, [success, handleCancel, socket])

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Add new column</DialogTitle>
            <DialogContent>
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TextField
                        required
                        margin='normal'
                        id='name'
                        label='Name'
                        variant='standard'
                        fullWidth
                        error={nameHasError}
                        helperText={nameHasError ? 'name not valid' : ''}
                        onChange={(e) => nameChangeHandler(e)}
                        onBlur={(e) => nameBlurHandler(e)}
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                {error && <Alert severity='error'>{error}</Alert>}
                {success && (
                    <Alert severity='success'>Column created successfully!</Alert>
                )}
                {loading && <CircularProgress />}

                {!success && (
                    <>
                        <Button
                            color='error'
                            variant='contained'
                            size='large'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!formIsValid}
                            variant='contained'
                            size='large'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default TasksColumnAddDialog
