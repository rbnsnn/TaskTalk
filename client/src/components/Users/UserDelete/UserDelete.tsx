import React, { useEffect } from 'react'
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogActions,
    DialogContent,
} from '@mui/material'
import { UserData } from '../../../types/user-data.type'
import { useApi } from '../../../hooks/useApi'

interface Props {
    deleteOpen: boolean
    user: UserData
    handleDeleteClose: () => void
}

const UserDelete: React.FC<Props> = ({ deleteOpen, handleDeleteClose, user }) => {
    const { success, loading, error, executeFetch } = useApi(
        `users/${user.userId}`,
        'DELETE',
        false
    )

    const handleDeleteUser = (): void => {
        executeFetch()
    }

    useEffect(() => {
        if (!success) {
            return
        }
        const userDeleted = setTimeout(() => {
            handleDeleteClose()
        }, 1000)

        return () => {
            clearTimeout(userDeleted)
        }
    }, [handleDeleteClose, success])

    return (
        <Dialog
            fullWidth
            open={deleteOpen}
        >
            <DialogTitle id='delete-user-dialog'>
                Are You sure You want to delete user: {user.username}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='delete-user-description'>
                    This user will be deleted immediately. You can't undo this action.
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
                {success && <Alert severity='success'>User deleted successfully!</Alert>}
                {loading && <CircularProgress />}
                {!success && (
                    <>
                        <Button
                            onClick={handleDeleteClose}
                            variant='contained'
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteUser}
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

export default UserDelete
