import React from 'react'
import { Alert, DialogActions, Button, CircularProgress } from '@mui/material'

interface Props {
    dialog: {
        handleSubmit: () => void
        handleCancel: () => void
        formIsValid: boolean
    }
    dialogApi: {
        error: string
        success: boolean
        loading: boolean
    }
}

const TaskAddDialogActions: React.FC<Props> = ({ dialog, dialogApi }) => {
    const { error, success, loading } = dialogApi
    const { handleSubmit, handleCancel, formIsValid } = dialog

    return (
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
    )
}

export default TaskAddDialogActions
