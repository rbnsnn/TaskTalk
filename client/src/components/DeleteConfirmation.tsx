import React from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'

interface Props {
    open: boolean
    close: () => void
}
const DeleteConfirmation: React.FC<Props> = ({ open, close }) => {
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
                ></Box>
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
                    // onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    size='large'
                    // onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmation
