import React from 'react'
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardContent,
    IconButton,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UserAvatar from './UserAvatar'
import { ISize } from './stringAvatar'

interface Props {
    id: string
}

const UserPopperContent: React.FC<Props> = ({ id }) => {
    const size: ISize = {
        height: 48,
        width: 48,
        fontSize: 24,
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <UserAvatar
                        id={id}
                        size={size}
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
