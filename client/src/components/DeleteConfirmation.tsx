import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material'
import DialogContentText from '@mui/material/DialogContentText'
import { useInput } from '../hooks/useInput'
import { isEqual } from '../helpers/formHelper'

interface Props {
    open: boolean
    close: () => void
    action?: () => void
    conditions: string
    text: React.ReactNode
}
const DeleteConfirmation: React.FC<Props> = ({
    open,
    close,
    action,
    conditions,
    text,
}) => {
    const {
        value: inputValue,
        isValid: inputIsValid,
        hasError: inputHasError,
        valueChangeHandler: inputChangeHandler,
        inputBlurHandler: inputBlurHandler,
        reset: inputReset,
    } = useInput(isEqual(conditions))

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
                    {text}
                </DialogContentText>
                <DialogContentText
                    align='center'
                    id='dlete-confirmation-conditions'
                    mt={3}
                >
                    Please type <b>{conditions}</b> to confirm.
                </DialogContentText>
                <TextField
                    required
                    margin='normal'
                    id='confirm'
                    label='Confirm'
                    variant={'outlined' as any}
                    fullWidth
                    error={inputHasError}
                    helperText={inputHasError ? 'Confirmation not valid' : ''}
                    onChange={(e) => inputChangeHandler(e)}
                    onBlur={(e) => inputBlurHandler(e)}
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
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!inputIsValid}
                    variant='contained'
                    size='large'
                    onClick={action}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmation
