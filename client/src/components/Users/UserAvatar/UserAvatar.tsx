import React, { useState } from 'react'
import { Avatar, Box, styled } from '@mui/material'
import { stringToColor } from '../../../helpers/stringToColor'
import { useApi } from '../../../hooks/useApi'
import UserAvatarPopper from './UserAvatarPopper'
import PersonIcon from '@mui/icons-material/Person'

const StyledAvatar = styled(Avatar)<{ size: number; stringcolor: string }>(
    ({ theme, size, stringcolor }) => ({
        cursor: 'pointer',
        width: size,
        height: size,
        fontSize: size / 2,
        backgroundColor: stringcolor,
        color: theme.palette.getContrastText(stringcolor),
    })
)

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

    const stringColor = stringToColor(`${firstName} ${lastName}`)

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
            <StyledAvatar
                onMouseLeave={popper ? handleClose : undefined}
                onMouseMove={popper ? handleMouseMove : undefined}
                onMouseEnter={popper ? handleMouseEnter : undefined}
                size={size}
                stringcolor={stringColor}
            >
                {firstName.length && lastName.length ? (
                    `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: size + 10,
                            width: size + 10,
                            backgroundColor: '#999',
                        }}
                    >
                        <PersonIcon
                            sx={{ width: size - 5, height: size - 5, color: '#121212' }}
                        />
                    </Box>
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
            </StyledAvatar>
        </>
    )
}

export default UserAvatar
