import { Avatar, CircularProgress } from '@mui/material'
import React from 'react'
import { useApi } from '../../../hooks/useApi'
import { stringAvatar } from './stringAvatar'

interface Props {
    id: string | undefined
    size?: {
        width: number
        height: number
        fontSize?: number
    }
}

const UserAvatar: React.FC<Props> = ({
    id,
    size = { width: 24, height: 24, fontSize: 12 },
}) => {
    const { data, loading } = useApi(`users/name/${id}`, 'GET')

    if (!data || loading) {
        return <CircularProgress size={size.height} />
    } else if (data && data.firstName !== '' && data.lastName !== '') {
        return <Avatar {...stringAvatar(`${data.firstName} ${data.lastName}`, size)} />
    } else {
        return <Avatar sx={size} />
    }
}

export default UserAvatar
