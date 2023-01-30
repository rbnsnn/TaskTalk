import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { useApi } from '../../../hooks/useApi'
import { stringToColor } from './stringAvatar'
import UserPopper from './UserPopper'

interface Props {
    id: string | undefined
}

const UserAvatarTable: React.FC<Props> = ({ id }) => {
    const { data, error, loading } = useApi(`users/name/${id}`, 'GET')

    const [open, setOpen] = useState<boolean>(false)
    const [delayHandler, setDelayHandler] = useState<ReturnType<
        typeof setTimeout
    > | null>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleClose = () => {
        setDelayHandler(
            setTimeout(() => {
                setOpen(false)
            }, 50)
        )
    }

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true)
        setAnchorEl(event.currentTarget)
    }

    return (
        <>
            {data && data.firstName !== '' && data.lastName !== '' && (
                <Avatar
                    onMouseLeave={handleClose}
                    onMouseOver={handleMouseOver}
                    sx={{
                        width: 24,
                        height: 24,
                        fontSize: 12,
                        bgcolor: stringToColor(`${data.firstName} ${data.lastName}`),
                    }}
                >
                    {`${data.firstName[0]}${data.lastName[0]}`}
                    <UserPopper
                        id={id!}
                        open={open}
                        handleClose={handleClose}
                        anchor={anchorEl}
                        delayHandler={delayHandler}
                    />
                </Avatar>
            )}
            {data && data.firstName === '' && data.lastName === '' && (
                <Avatar sx={{ width: 24, height: 24 }} />
            )}
        </>
    )
}

export default UserAvatarTable
