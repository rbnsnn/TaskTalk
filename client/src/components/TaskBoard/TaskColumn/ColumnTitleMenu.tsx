import React, { useState } from 'react'
import { Menu, IconButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

import ColorLensIcon from '@mui/icons-material/ColorLens'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface Props {
    menuOpen: null | HTMLElement
    handleClose: () => void
    handleEdit: () => void
}

const ColumnTitleMenu: React.FC<Props> = ({ menuOpen, handleClose, handleEdit }) => {
    const open = Boolean(menuOpen)

    const handleClick = () => {
        handleEdit()
        handleClose()
    }

    return (
        <Menu
            open={open}
            onClose={handleClose}
            anchorEl={menuOpen}
        >
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DriveFileRenameOutlineIcon />
                </ListItemIcon>
                <ListItemText>Rename</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    )
}

export default ColumnTitleMenu
