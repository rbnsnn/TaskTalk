import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { stringToColor } from './stringAvatar'
import UserPopper from './UserPopper'

interface Props {
    id: string
    firstName: string
    lastName: string
    username: string
}

const UserAvatarTable: React.FC<Props> = ({ id, firstName, lastName, username }) => {
    // const { data } = useApi(`users/name/${id}`, 'GET')

    const [open, setOpen] = useState<boolean>(false)
    const [delayHandler, setDelayHandler] = useState<ReturnType<
        typeof setTimeout
    > | null>(null)
    const [anchorEl, setAnchorRef] = useState<HTMLElement | null>(null)

    const handleClose = () => {
        setDelayHandler(
            setTimeout(() => {
                setOpen(false)
            }, 100)
        )
    }

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true)
        setAnchorRef(event.currentTarget)
    }

    return (
        <>
            {firstName !== '' && lastName !== '' && (
                <Avatar
                    onMouseLeave={handleClose}
                    onMouseMove={handleMouseOver}
                    sx={{
                        width: 24,
                        height: 24,
                        fontSize: 12,
                        bgcolor: stringToColor(`${firstName} ${lastName}`),
                    }}
                >
                    {`${firstName[0]}${lastName[0]}`}
                    <UserPopper
                        id={id!}
                        open={open}
                        handleClose={handleClose}
                        anchor={anchorEl}
                        delayHandler={delayHandler}
                    />
                </Avatar>
            )}
            {firstName === '' ||
                (lastName === '' && <Avatar sx={{ width: 24, height: 24 }} />)}
        </>
    )
}

export default UserAvatarTable
