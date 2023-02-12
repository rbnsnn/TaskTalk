import React from 'react'
import { Popper, Fade, Paper, Box } from '@mui/material'
import { CustomPicker } from 'react-color'
import { TaskEvent } from '../../../../../types/task-event-enum.type'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import StyledPicker from './StyledPicker'

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
    const handleChangeColor = (color: any): void => {
        setColumnColor(color.hex)
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
    return (
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
                        offset: [100, 10],
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={200}
                >
                    <Paper
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <StyledPicker
                        // width='215px'
                        // color={columnColor}
                        // onChangeComplete={handleChangeColor}
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
                                }}
                            />
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}

export default CustomPicker(ColorPicker)
