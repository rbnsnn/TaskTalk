import React, { useState } from 'react'
import { Popper, Fade, Paper, Box } from '@mui/material'
import { TaskEvent } from '../../../../../types/task-event-enum.type'
import { PopperArrow } from '../../../../Users/UserAvatar/UserAvatarPopper'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import StyledPicker from './StyledPicker'
import ClickAwayListener from '@mui/material/ClickAwayListener'

interface Props {
    columnColor: string
    setColumnColor: any
    open: boolean
    id: string
    name: string
    anchorEl: any
    socket: any
    handleClose: () => void
}

const ColorPicker: React.FC<Props> = ({
    columnColor,
    setColumnColor,
    open,
    id,
    name,
    anchorEl,
    socket,
    handleClose,
}) => {
    const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null)
    const handleChangeColor = (color: any): void => {
        setColumnColor(color)
    }

    const handleApply = (): void => {
        socket.emit(TaskEvent.ColumnColorChange, {
            columnId: id,
            color: columnColor,
            name,
        })
        handleClose()
    }

    const handleDefault = (): void => {
        setColumnColor('')
    }

    const handleClickAway = (): void => {
        handleDefault()
        handleClose()
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
                transition
                id={id}
                className='popper'
                open={open}
                anchorEl={anchorEl}
                placement='bottom'
                disablePortal={false}
                sx={{ zIndex: 2000 }}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [100, 5],
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
                        timeout={200}
                    >
                        <Box>
                            <PopperArrow
                                sx={{}}
                                className='arrow'
                                ref={setArrowRef}
                            />
                            <Paper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: 1,
                                    pr: 1,
                                }}
                            >
                                <StyledPicker
                                    active={columnColor}
                                    onChangeComplete={handleChangeColor}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleIcon
                                        onClick={handleApply}
                                        sx={{
                                            cursor: 'pointer',
                                            margin: '5px',
                                            width: '25px',
                                            height: '25px',
                                            color: '#33A095',
                                            transition: 'ease-in-out 0.2s',
                                            '&:hover': {
                                                color: '#005F56',
                                            },
                                        }}
                                    />
                                    <SettingsBackupRestoreIcon
                                        onClick={handleDefault}
                                        sx={{
                                            cursor: 'pointer',
                                            margin: '5px',
                                            width: '25px',
                                            height: '25px',
                                            transition: 'ease-in-out 0.2s',
                                            '&:hover': {
                                                color: '#33A095',
                                            },
                                        }}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </ClickAwayListener>
    )
}

export default ColorPicker
