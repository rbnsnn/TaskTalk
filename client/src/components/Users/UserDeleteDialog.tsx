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

interface Props {
    deleteOpen: boolean
    setDeleteOpen: Dispatch<boolean>
    user: UserData
}

const UserDeleteDialog: React.FC<Props> = ({ deleteOpen, setDeleteOpen, user }) => {
    const handleClose = (): void => {
        setDeleteOpen(false)
    }
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
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button
                    onClick={handleClose}
                    autoFocus
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDeleteDialog
