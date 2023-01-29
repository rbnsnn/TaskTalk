import { Avatar, Box } from '@mui/material'
import React from 'react'
import { useApi } from '../../../hooks/useApi'
import { stringAvatar } from './stringAvatar'

interface Props {
    id: string
}

const UserAvatar: React.FC<Props> = ({ id }) => {
    const { data, error, loading } = useApi(`users/name/${id}`, 'GET')

    return (
        <>
            {data && data.firstName !== '' && data.lastName !== '' && (
                <Avatar {...stringAvatar(`${data.firstName} ${data.lastName}`)} />
            )}
            {data && data.firstName === '' && data.lastName === '' && (
                <Avatar sx={{ width: 32, height: 32 }} />
            )}
        </>
    )
}

export default UserAvatar
