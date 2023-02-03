import React, { useState } from 'react'
import { Fade, Box, styled } from '@mui/material'
import UserPopperContent from './UserPopperContent'
import PopperUnstyled from '@mui/base/PopperUnstyled'

const PopperArrow = styled('div')`
    &::before {
        content: '';
        background: #1e1e1e;
        width: 15px;
        height: 15px;
        transform: translate(-50%, -50%) rotate(45deg);
        position: absolute;
    }
`

const PopperComponent = styled(PopperUnstyled)`
    &[data-popper-placement^='right'] {
        .arrow {
            left: 0px;
        }
    }

    &[data-popper-placement^='left'] {
        .arrow {
            right: 0px;
        }
    }

    &[data-popper-placement^='top'] {
        .arrow {
            bottom: 0px;
        }
    }

    &[data-popper-placement^='bottom'] {
        .arrow {
            top: 0px;
        }
    }
`

interface Props {
    id: string
    open: boolean
    handleClose: () => void
    anchor: HTMLElement | null
    arrow?: HTMLElement | null
    delayHandler?: ReturnType<typeof setTimeout> | null
    firstName: string
    lastName: string
}

const UserPopper: React.FC<Props> = ({
    id,
    open,
    handleClose,
    anchor,
    delayHandler,
    firstName,
    lastName,
}) => {
    const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null)

    const handleMouseEnter = (): void => {
        clearTimeout(delayHandler!)
    }

    return (
        <PopperComponent
            transition
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleClose}
            id={id}
            className='popper'
            open={open}
            anchorEl={anchor}
            placement='top'
            disablePortal={false}
            sx={{ zIndex: 2000 }}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'viewport',
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
                        rootBoundary: 'viewport',
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
                {
                    name: 'offset',
                    options: {
                        offset: [0, 5],
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={400}
                >
                    <Box>
                        <PopperArrow
                            className='arrow'
                            ref={setArrowRef}
                        />
                        <UserPopperContent
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    </Box>
                </Fade>
            )}
        </PopperComponent>
    )
}

export default UserPopper
