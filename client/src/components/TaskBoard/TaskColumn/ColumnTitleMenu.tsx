import React, { useContext } from 'react'
import { Menu, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../types/task-event-enum.type'

interface Props {
    columnId: string
    menuOpen: null | HTMLElement
    handleClose: () => void
    handleEdit: () => void
}

const ColumnTitleMenu: React.FC<Props> = ({
    columnId,
    menuOpen,
    handleClose,
    handleEdit,
}) => {
    const socket: any = useContext(SocketContext)
    const open = Boolean(menuOpen)

    const handleClick = () => {
        handleEdit()
        handleClose()
    }

    const handleDelete = () => {
        socket.emit(TaskEvent.DeleteColumn, columnId)
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
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    )
}

export default ColumnTitleMenu
