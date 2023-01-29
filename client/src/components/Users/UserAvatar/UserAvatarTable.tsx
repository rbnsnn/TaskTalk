import React, { useState } from 'react'
import { Avatar, Box, Popper } from '@mui/material'
import { useApi } from '../../../hooks/useApi'
import { stringToColor } from './stringAvatar'
import Paper from '@mui/material/Paper'

interface Props {
    id: string | undefined
}

const UserAvatarTable: React.FC<Props> = ({ id }) => {
    const { data, error, loading } = useApi(`users/name/${id}`, 'GET')

    const [open, setOpen] = useState<boolean>(false)
    const [delayHandler, setDelayHandler] = useState<ReturnType<
        typeof setTimeout
    > | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null)

    const handleClose = () => {
        setDelayHandler(
            setTimeout(() => {
                setOpen(false)
            }, 100)
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
                    <Popper
                        onMouseEnter={() => clearTimeout(delayHandler!)}
                        onMouseLeave={handleClose}
                        sx={{ zIndex: 9 }}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        placement='top'
                        disablePortal={false}
                        modifiers={[
                            {
                                name: 'arrow',
                                enabled: true,
                                options: {
                                    element: arrowRef,
                                },
                            },
                        ]}
                    >
                        <Paper sx={{ p: 3 }}>
                            The content of the Popper.
                            <span ref={setArrowRef} />
                        </Paper>
                    </Popper>
                </Avatar>
            )}
            {data && data.firstName === '' && data.lastName === '' && (
                <Avatar sx={{ width: 24, height: 24 }} />
            )}
        </>
    )
}

export default UserAvatarTable
