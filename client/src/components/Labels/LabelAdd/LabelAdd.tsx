import React, { useState } from 'react'
import { Button } from '@mui/material'
import LabelAddDialog from './LabelAddDialog'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

const LabelAdd: React.FC = () => {
    const [addLabelOpen, setAddLabelOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddLabelOpen(false)
    }

    const handleOpen = (): void => {
        setAddLabelOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                    ml: 2,
                }}
            >
                <BookmarkAddIcon sx={{ mr: 2 }} />
                Add Label
            </Button>
            {addLabelOpen && (
                <LabelAddDialog
                    open={addLabelOpen}
                    close={handleClose}
                />
            )}
        </>
    )
}
export default LabelAdd
