import React, { useState } from 'react'
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
} from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import PhoneIcon from '@mui/icons-material/Phone'
import { UserData } from '../../types/user-data.type'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import UserDeleteDialog from './UserDeleteDialog'

interface Props {
    user: UserData
    handleUpdate: () => void
}

const UserDetails: React.FC<Props> = ({ user, handleUpdate }) => {
    const userCreated = new Date(user.created!)
    const { userId } = useSelector((state: RootState) => state.auth.user)

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

    const handleDeleteOpen = (): void => {
        setDeleteOpen(true)
    }

    const handleDeleteClose = (): void => {
        handleUpdate()
        setDeleteOpen(false)
    }

    return (
        <>
            <UserDeleteDialog
                deleteOpen={deleteOpen}
                handleDeleteClose={handleDeleteClose}
                user={user}
            />
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary='Name'
                        secondary={
                            user.firstName ? `${user.firstName} ${user.lastName}` : 'ND'
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccessibilityNewIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary='Created'
                        secondary={userCreated.toLocaleDateString()}
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary='Phone'
                        secondary={user.phoneNumber}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Button
                        size='small'
                        variant='contained'
                    >
                        Edit
                    </Button>
                    {userId === user.userId ? null : (
                        <Button
                            size='small'
                            variant='contained'
                            color='error'
                            onClick={handleDeleteOpen}
                        >
                            Delete
                        </Button>
                    )}
                </ListItem>
            </List>
        </>
    )
}

export default UserDetails
