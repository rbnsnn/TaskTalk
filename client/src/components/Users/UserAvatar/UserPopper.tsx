import React, { useState } from 'react'
import { Popper, Fade, Box, styled } from '@mui/material'
import UserPopperContent from './UserPopperContent'

const Arrow = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    position: 'absolute',
    width: '15px',
    height: '15px',
    boxSizing: 'border-box',

    '&::before': {
        borderRadius: '0px',
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
        transform: 'rotate(45deg) translate(-50%, -50%)',
    },
}))

interface Props {
    id: string
    open: boolean
    handleClose: () => void
    anchor: HTMLElement | null
    arrow?: HTMLElement | null
    delayHandler?: ReturnType<typeof setTimeout> | null
}

const UserPopper: React.FC<Props> = ({ id, open, handleClose, anchor, delayHandler }) => {
    const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null)

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>): void => {
        // setArrowRef(event.currentTarget)
        clearTimeout(delayHandler!)
    }

    return (
        <Popper
            transition
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleClose}
            sx={{ zIndex: 9 }}
            id={id}
            open={open}
            anchorEl={anchor}
            placement='top'
            disablePortal={false}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: arrowRef,
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={350}
                >
                    <Box>
                        <UserPopperContent id={id} />
                        <Arrow ref={setArrowRef} />
                    </Box>
                </Fade>
            )}
        </Popper>
    )
}

export default UserPopper
