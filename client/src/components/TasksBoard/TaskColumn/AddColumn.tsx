import React, { useState } from 'react'
import { Button } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AddColumnDialog from './AddColumnDialog'

const AddColumn: React.FC = () => {
    const [addColumnOpen, setAddColumnOpen] = useState<boolean>(false)

    const handleClose = (): void => {
        setAddColumnOpen(false)
    }

    const handleOpen = (): void => {
        setAddColumnOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                    mb: 2,
                    mt: 2,
                }}
            >
                <PostAddIcon sx={{ mr: 2 }} />
                Add Column
            </Button>
            <AddColumnDialog
                open={addColumnOpen}
                close={handleClose}
            />
        </>
    )
}

export default AddColumn
