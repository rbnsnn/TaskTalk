import React, { useContext, useState } from 'react'
import { Menu, ListItemIcon, ListItemText, MenuItem, Divider } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PaletteIcon from '@mui/icons-material/Palette'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { TaskEvent } from '../../../types/task-event-enum.type'
import DeleteConfirmation from '../../DeleteConfirmation'

interface Props {
    columnId: string
    name: string
    menuOpen: null | HTMLElement
    handleClose: () => void
    handleEdit: () => void
}

const ColumnTitleMenu: React.FC<Props> = ({
    columnId,
    name,
    menuOpen,
    handleClose,
    handleEdit,
}) => {
    const socket: any = useContext(SocketContext)
    const open = Boolean(menuOpen)
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)

    const handleClick = () => {
        handleEdit()
        handleClose()
    }

    const handleDelete = (): void => {
        socket.emit(TaskEvent.DeleteColumn, columnId)
        handleClose()
    }

    const handleConfirmationOpen = (): void => {
        setConfirmationOpen(true)
    }

    const handleConfirmationClose = (): void => {
        setConfirmationOpen(false)
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
            <MenuItem onClick={handleConfirmationOpen}>
                <ListItemIcon>
                    <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
            {confirmationOpen && (
                <DeleteConfirmation
                    open={confirmationOpen}
                    close={handleConfirmationClose}
                    action={handleDelete}
                    conditions={name}
                    text={
                        <>
                            This action cannot be undone and will permanently delete the
                            <b> {name}</b> column with all tasks assigned to it.
                        </>
                    }
                />
            )}
        </Menu>
    )
}

export default ColumnTitleMenu
