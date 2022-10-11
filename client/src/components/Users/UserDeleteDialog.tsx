import React, { Dispatch } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogActions,
    DialogContent,
} from '@mui/material'
import { UserData } from '../../types/user-data.type'
import { useApi } from '../../hooks/useApi'

interface Props {
    deleteOpen: boolean
    setDeleteOpen: Dispatch<boolean>
    user: UserData
}

const UserDeleteDialog: React.FC<Props> = ({ deleteOpen, setDeleteOpen, user }) => {
    const { success, loading, error, executeFetch } = useApi(
        `users/${user.userId}`,
        'DELETE',
        false
    )
    const handleClose = (): void => {
        setDeleteOpen(false)
    }

    const handleDelete = (): void => {}

    return (
        <Dialog
            onClose={handleClose}
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
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant='contained'
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    autoFocus
                    variant='contained'
                    color='error'
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDeleteDialog
