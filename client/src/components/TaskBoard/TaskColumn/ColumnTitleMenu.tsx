import React, { useState } from 'react'
import { Menu, IconButton, MenuItem } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface Props {
    menuOpen: boolean
    handleOpen: () => void
    handleClose: () => void
    handleEdit: () => void
}

const ColumnTitleMenu: React.FC<Props> = ({
    menuOpen,
    handleOpen,
    handleClose,
    handleEdit,
}) => {
    return (
        <Menu
            open={menuOpen}
            onClick={handleOpen}
            onClose={handleClose}
        >
            <MenuItem>
                <IconButton
                    onClick={handleEdit}
                    size='small'
                >
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </MenuItem>

            <IconButton size='small'>
                <ColorLensIcon />
            </IconButton>

            <IconButton size='small'>
                <DeleteForeverIcon />
            </IconButton>
        </Menu>
    )
}

export default ColumnTitleMenu
