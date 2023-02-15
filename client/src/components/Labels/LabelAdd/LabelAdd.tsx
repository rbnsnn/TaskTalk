import React, { useState } from 'react'
import { Button } from '@mui/material'
import LabelAddDialog from './LabelAddDialog'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

interface Props {
    handleUpdate: () => void
}

const LabelAdd: React.FC<Props> = ({ handleUpdate }) => {
    const [addLabelOpen, setAddLabelOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddLabelOpen(false)
        handleUpdate()
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
