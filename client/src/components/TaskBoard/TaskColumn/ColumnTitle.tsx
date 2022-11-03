import React, { useState } from 'react'
import { Box, IconButton, Typography, TextField, Badge, Tooltip } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ColumnTitleMenu from './ColumnTitleMenu'

interface Props {
    name: string
    count: number
}

const ColumnTitle: React.FC<Props> = ({ name, count }) => {
    const [title, setTitle] = useState<string>(name)
    const [editing, setEditing] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null)

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuOpen(event.currentTarget)
    }

    const handleMenuClose = (): void => {
        setMenuOpen(null)
    }

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
            width='100%'
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
                    sx={{
                        mr: 2,
                    }}
                />

                {!editing && (
                    <>
                        <IconButton
                            onClick={handleMenuOpen}
                            size='small'
                        >
                            <MoreHorizIcon />
                        </IconButton>

                        <ColumnTitleMenu
                            menuOpen={menuOpen}
                            handleClose={handleMenuClose}
                            handleEdit={handleEdit}
                        />
                    </>
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
