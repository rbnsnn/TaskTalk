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
import { useAppSelector } from '../../hooks/redux-hooks'
import { RootState } from '../../store/store'
import UserDelete from './UserDelete/UserDelete'

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

    const handlePasswordReset = (): void => {
        console.log('password reset')
    }

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
                {userId === user.userId ? null : (
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Button
                            size='small'
                            variant='contained'
                            onClick={handlePasswordReset}
                        >
                            Reset Password
                        </Button>

                        <Button
                            size='small'
                            variant='contained'
                            color='error'
                            onClick={handleDeleteOpen}
                        >
                            Delete User
                        </Button>
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default UserDetails
