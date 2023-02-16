import React, { useState } from 'react'
import { Button } from '@mui/material'
import { LabelI } from '../../../types/task-label.type'
import LabelDeleteDialog from './LabelDeleteDialog'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'

interface Props {
    label: LabelI
    handleUpdate: () => void
}

const LabelDelete: React.FC<Props> = ({ label, handleUpdate }) => {
    const [deleteLabelOpen, setDeleteLabelOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setDeleteLabelOpen(false)
        handleUpdate()
    }

    const handleOpen = (): void => {
        setDeleteLabelOpen(true)
    }

    return (
        <>
            <Button
                size='small'
                color='error'
                onClick={handleOpen}
            >
                <BookmarkRemoveIcon sx={{ mr: 1 }} />
                Delete
            </Button>
            <LabelDeleteDialog
                open={deleteLabelOpen}
                label={label}
                handleClose={handleClose}
            />
        </>
    )
}

export default LabelDelete
