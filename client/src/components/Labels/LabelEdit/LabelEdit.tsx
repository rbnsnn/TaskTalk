import React, { useState } from 'react'
import { Button } from '@mui/material'
import { LabelI } from '../../../types/task-label.type'
import LabelEditDialog from './LabelEditDialog'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
    handleUpdate: () => void
    label: LabelI
}

const LabelEdit: React.FC<Props> = ({ handleUpdate, label }) => {
    const [editLabelOpen, setEditLabelOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setEditLabelOpen(false)
        handleUpdate()
    }

    const handleOpen = (): void => {
        setEditLabelOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='text'
                size='small'
            >
                <EditIcon sx={{ mr: 1 }} />
                Edit
            </Button>
            {editLabelOpen && (
                <LabelEditDialog
                    open={editLabelOpen}
                    close={handleClose}
                    label={label}
                />
            )}
        </>
    )
}
export default LabelEdit
