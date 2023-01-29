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

    const [open, setOpen] = React.useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null)

    const handletest = () => {
        if (open === true) {
            setOpen(false)
        } else {
            return
        }
    }
    const handleClose = () => {
        setTimeout(handletest, 1000)
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
                        <Paper sx={{ border: 1, p: 1 }}>
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
