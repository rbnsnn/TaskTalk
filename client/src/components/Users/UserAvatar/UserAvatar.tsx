import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { stringToColor } from './stringToColor'
import UserPopper from './UserPopper'

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
            {firstName === '' || lastName === '' ? (
                <Avatar sx={{ width: size, height: size }} />
            ) : (
                <Avatar
                    onMouseLeave={handleClose}
                    onMouseMove={handleMouseOver}
                    sx={{
                        cursor: 'pointer',
                        width: size,
                        height: size,
                        fontSize: size / 2,
                        bgcolor: stringToColor(`${firstName} ${lastName}`),
                    }}
                >
                    {`${firstName[0]}${lastName[0]}`}
                    {popper && (
                        <UserPopper
                            id={id!}
                            open={open}
                            handleClose={handleClose}
                            anchor={anchorEl}
                            delayHandler={delayHandler}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    )}
                </Avatar>
            )}
        </>
    )
}

export default UserAvatar
