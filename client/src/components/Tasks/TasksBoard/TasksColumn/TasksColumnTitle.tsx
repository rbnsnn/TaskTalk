import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
    Box,
    IconButton,
    Typography,
    TextField,
    Badge,
    Tooltip,
    LinearProgress,
    Snackbar,
    Alert,
    styled,
} from '@mui/material'
import { TasksColumnTitleContainer } from './TasksColumnTitleContainer'
import { TaskEvent } from '../../../../types/task-event-enum.type'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { DraggableStateSnapshot } from 'react-beautiful-dnd'
import DoneIcon from '@mui/icons-material/Done'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TasksColumnTitleMenu from './TasksColumnTitleMenu'
import ColorPicker from './ColorPicker/ColorPicker'
import { ColumnData } from '../../../../types/column-data.type'

const RenameTextField = styled(TextField)<{ contrast: string }>(
    ({ theme, contrast }) => ({
        input: {
            color: contrast ? theme.palette.getContrastText(contrast) : '',
        },
    })
)

const MenuButton = styled(IconButton)<{ contrast: string }>(({ theme, contrast }) => ({
    color: contrast ? theme.palette.getContrastText(contrast) : '',
}))

interface Props {
    column: ColumnData
    columnColor: string
    dragHandle: any
    snapshot: DraggableStateSnapshot
    menuOpen: HTMLElement | null
    setColumnColor: any
    deleteDialogOpen: () => void
    handleMenuOpen: (e: any) => void
    handleMenuClose: () => void
}

const TasksColumnTitle: React.FC<Props> = ({
    column,
    columnColor,
    dragHandle,
    deleteDialogOpen,
    menuOpen,
    handleMenuOpen,
    handleMenuClose,
    snapshot,
    setColumnColor,
}) => {
    const { name, columnId, color } = column

    const socket: any = useContext(SocketContext)
    const [colorOpen, setColorOpen] = useState<boolean>(false)
    const [editing, setEditing] = useState<boolean>(false)
    const [columnName, setColumnName] = useState<string>(name)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleEdit = (): void => {
        setEditing(true)
    }

    const handleColorOpen = (): void => {
        setColorOpen(true)
    }
    const handleColorClose = (): void => {
        setColorOpen(false)
    }

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setColumnName(e.target.value)
    }

    const handleApply = (): void => {
        if (columnName === name || columnName.length < 4) {
            setEditing(false)
            return
        }
        socket.emit(TaskEvent.RenameColumn, { columnName, color, columnId })
    }

    const handleOnEnterKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter') {
            handleApply()
        }
    }

    const handleSocket = async (res: any) => {
        setLoading(true)
        setError(res.error)
        setSuccess(res.success)
        setLoading(false)
    }

    const handleReset = useCallback((): void => {
        setSuccess(false)
        setError(false)
        setLoading(false)
        setEditing(false)
    }, [])

    useEffect(() => {
        socket.on(TaskEvent.RenameColumn, async (res: any) => {
            if (res.columnId === columnId) {
                await handleSocket(res)
            }
        })
        if (!success) {
            return
        }
        handleReset()

        return () => {
            socket.off(TaskEvent.CreateColumn)
        }
    }, [success, socket, handleReset, columnId])

    return (
        <TasksColumnTitleContainer
            color={columnColor}
            dragging={snapshot.isDragging ? 1 : 0}
        >
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                padding='0 20px'
                onMouseOver={(e) => setAnchorEl(e.currentTarget)}
            >
                {colorOpen && (
                    <ColorPicker
                        columnColor={columnColor}
                        setColumnColor={setColumnColor}
                        open={colorOpen}
                        id={columnId}
                        name={columnName}
                        anchorEl={anchorEl}
                        socket={socket}
                        handleClose={handleColorClose}
                    />
                )}
                <Box
                    flex={1}
                    {...dragHandle}
                >
                    {!editing && <Typography fontWeight='bold'>{name}</Typography>}
                    {editing && (
                        <RenameTextField
                            contrast={columnColor}
                            id='column-name'
                            variant='standard'
                            size='small'
                            value={columnName}
                            onChange={handleTitleChange}
                            onBlur={handleApply}
                            onKeyDown={handleOnEnterKey}
                            autoFocus
                        />
                    )}
                </Box>
                <Box>
                    <Badge
                        badgeContent={column.tasks.length}
                        color='primary'
                        sx={{
                            mr: 2,
                        }}
                    />

                    {!editing && (
                        <>
                            <MenuButton
                                contrast={columnColor}
                                onClick={handleMenuOpen}
                                size='small'
                            >
                                <MoreHorizIcon />
                            </MenuButton>

                            <TasksColumnTitleMenu
                                menuOpen={menuOpen}
                                handleClose={handleMenuClose}
                                handleEdit={handleEdit}
                                handleColorOpen={handleColorOpen}
                                deleteDialogOpen={deleteDialogOpen}
                            />
                        </>
                    )}
                    {editing && (
                        <Tooltip
                            title='Accept'
                            placement='top'
                        >
                            <IconButton
                                onClick={handleApply}
                                size='small'
                            >
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>

            <Box
                width='100%'
                height={2}
            >
                {loading && <LinearProgress />}
            </Box>

            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity='error'
                    sx={{ width: '100%' }}
                    variant='filled'
                >
                    Column already exists!
                </Alert>
            </Snackbar>
        </TasksColumnTitleContainer>
    )
}

export default TasksColumnTitle
