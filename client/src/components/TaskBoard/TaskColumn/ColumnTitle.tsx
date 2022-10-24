import React, { useState } from 'react'
import { Box, IconButton, Typography, TextField, Badge, Tooltip } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DoneIcon from '@mui/icons-material/Done'

interface Props {
    name: string
    count: number
}

const ColumnTitle: React.FC<Props> = ({ name, count }) => {
    const [title, setTitle] = useState<string>(name)
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
            width='300px'
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
            <Box>
                <Badge
                    badgeContent={count}
                    color='primary'
                />
                {!editing && (
                    <Tooltip
                        title='Rename'
                        placement='top'
                    >
                        <IconButton
                            onClick={handleEdit}
                            size='small'
                        >
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {editing && (
                    <Tooltip
                        title='Accept'
                        placement='top'
                    >
                        <IconButton
                            onClick={handleApply}
                            size='small'
                        >
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        </Box>
    )
}

export default ColumnTitle
