import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { stringToColor } from '../../../helpers/stringToColor'
import { useApi } from '../../../hooks/useApi'
import UserAvatarPopper from './UserAvatarPopper'

interface Props {
    id: string
    firstName: string
    lastName: string
    size?: any
    popper?: boolean
}

const UserAvatar: React.FC<Props> = ({
    id,
    firstName,
    lastName,
    size = 24,
    popper = false,
}) => {
    const { data, executeFetch } = useApi(`users/info/${id}`, 'GET', false)
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

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true)
        setAnchorRef(event.currentTarget)
    }
    const handleMouseEnter = () => {
        executeFetch()
    }
    return (
        <>
            <Avatar
                onMouseLeave={popper ? handleClose : undefined}
                onMouseMove={popper ? handleMouseMove : undefined}
                onMouseEnter={popper ? handleMouseEnter : undefined}
                sx={{
                    cursor: 'pointer',
                    width: size,
                    height: size,
                    fontSize: size / 2,
                    bgcolor: stringToColor(`${firstName} ${lastName}`),
                }}
            >
                {firstName.length && lastName.length ? (
                    `${firstName[0]}${lastName[0]}`
                ) : (
                    <Avatar sx={{ width: size, height: size }} />
                )}

                {popper && (
                    <UserAvatarPopper
                        id={id!}
                        open={open}
                        handleClose={handleClose}
                        anchor={anchorEl}
                        delayHandler={delayHandler}
                        data={data}
                    />
                )}
            </Avatar>
        </>
    )
}

export default UserAvatar
