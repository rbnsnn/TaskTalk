import React, { useState } from 'react'
import { Box, IconButton, Typography, TextField } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DoneIcon from '@mui/icons-material/Done'

const ColumnTitle: React.FC = () => {
    const [title, setTitle] = useState<string>('Edit')
    const [editing, setEditing] = useState<boolean>(false)

    const handleEdit = (): void => {
        setEditing(true)
    }

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value)
    }

    const handleApply = (): void => {
        setEditing(false)
    }

    const handleOnEnterKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter') {
            handleApply()
        }
    }
    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='440px'
            pr={2}
            pl={2}
        >
            {!editing && <Typography fontWeight='bold'>{title}</Typography>}
            {editing && (
                <TextField
                    id='column-name'
                    variant='standard'
                    size='small'
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={handleApply}
                    onKeyDown={handleOnEnterKey}
                    autoFocus
                />
            )}
            {!editing && (
                <IconButton onClick={handleEdit}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            )}
            {editing && (
                <IconButton onClick={handleApply}>
                    <DoneIcon />
                </IconButton>
            )}
        </Box>
    )
}

export default ColumnTitle
