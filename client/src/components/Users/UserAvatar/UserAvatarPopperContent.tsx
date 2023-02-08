import React from 'react'
import { Card, CardActions, CardHeader, CardContent, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UserAvatar from './UserAvatar'
import UserAvatarPopperLoading from './UserAvatarPopperLoading'

interface Props {
    id: string
    data: any
}

const UserPopperContent: React.FC<Props> = ({ id, data }) => {
    return (
        <Card>
            {data ? (
                <>
                    <CardHeader
                        avatar={
                            <UserAvatar
                                id={id}
                                size={48}
                                firstName={data.firstName}
                                lastName={data.lastName}
                            />
                        }
                        action={
                            <IconButton aria-label='settings'>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={`${data.firstName} ${data.lastName}`}
                        subheader='September 14, 2016'
                    />

                    <CardContent></CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label='share'>
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </>
            ) : (
                <UserAvatarPopperLoading />
            )}
        </Card>
    )
}

export default UserPopperContent
