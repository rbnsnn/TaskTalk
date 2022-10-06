import React from 'react'
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

interface Props {
    user: any
}

const UserDetails: React.FC<Props> = ({ user }) => {
    const userCreated = new Date(user.created)

    return (
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
                <Button
                    size='small'
                    variant='contained'
                    color='error'
                >
                    Delete
                </Button>
            </ListItem>
        </List>
    )
}

export default UserDetails
