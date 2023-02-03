import React from 'react'
import { Card, CardActions, CardHeader, CardContent, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UserAvatar from './UserAvatar'

interface Props {
    id: string
    firstName: string
    lastName: string
}

const UserPopperContent: React.FC<Props> = ({ id, firstName, lastName }) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <UserAvatar
                        id={id}
                        size={48}
                        firstName={firstName}
                        lastName={lastName}
                    />
                }
                action={
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title='Shrimp and Chorizo Paella'
                subheader='September 14, 2016'
            />

            <CardContent></CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label='share'>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default UserPopperContent
