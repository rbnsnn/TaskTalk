import React, { useState } from 'react'
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
} from '@mui/material'
import { UserData } from '../../../types/user-data.type'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { RootState } from '../../../store/store'
import BadgeIcon from '@mui/icons-material/Badge'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import PhoneIcon from '@mui/icons-material/Phone'
import UserDelete from '../UserDelete/UserDelete'
import LockResetIcon from '@mui/icons-material/LockReset'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

interface Props {
    user: UserData
    handleUpdate: () => void
}

const UserDetails: React.FC<Props> = ({ user, handleUpdate }) => {
    const userCreated = new Date(user.created!)
    const { userId } = useAppSelector((state: RootState) => state.auth.user)

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

    const handleDeleteOpen = (): void => {
        setDeleteOpen(true)
    }

    const handleDeleteClose = (): void => {
        handleUpdate()
        setDeleteOpen(false)
    }

    const handlePasswordReset = (): void => {}

    return (
        <>
            <UserDelete
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
                            user.firstName
                                ? `${user.firstName} ${user.lastName}`
                                : 'Not provided'
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
                        secondary={user.phoneNumber ? user.phoneNumber : 'Not provided'}
                    />
                </ListItem>
                {userId === user.userId ? null : (
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Button
                            size='small'
                            variant='text'
                            onClick={handlePasswordReset}
                        >
                            <LockResetIcon sx={{ mr: 1 }} />
                            Reset Password
                        </Button>

                        <Button
                            size='small'
                            variant='text'
                            color='error'
                            onClick={handleDeleteOpen}
                        >
                            <PersonRemoveIcon sx={{ mr: 1 }} />
                            Delete User
                        </Button>
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default UserDetails
