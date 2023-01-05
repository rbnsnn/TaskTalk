import React, { useState } from 'react'
import { Button } from '@mui/material'

import AddColumnDialog from './AddColumnDialog'

const AddColumn = () => {
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
