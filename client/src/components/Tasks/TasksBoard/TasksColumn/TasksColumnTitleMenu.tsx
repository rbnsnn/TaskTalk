import React from 'react'
import { Menu, ListItemIcon, ListItemText, MenuItem, Divider } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PaletteIcon from '@mui/icons-material/Palette'

interface Props {
    menuOpen: null | HTMLElement
    handleClose: () => void
    handleEdit: () => void
    deleteDialogOpen: () => void
}

const TasksColumnTitleMenu: React.FC<Props> = ({
    menuOpen,
    handleClose,
    handleEdit,
    deleteDialogOpen,
}) => {
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
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <PaletteIcon />
                </ListItemIcon>
                <ListItemText>Color</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={deleteDialogOpen}>
                <ListItemIcon sx={{ color: '#f44336' }}>
                    <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: '#f44336' }}>Delete</ListItemText>
            </MenuItem>
        </Menu>
    )
}

export default TasksColumnTitleMenu
