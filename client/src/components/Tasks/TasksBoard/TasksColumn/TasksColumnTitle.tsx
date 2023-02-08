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
import DoneIcon from '@mui/icons-material/Done'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TasksColumnTitleMenu from './TasksColumnTitleMenu'
import { TaskEvent } from '../../../../types/task-event-enum.type'
import { SocketContext } from '../../../../helpers/socket/socket-context'
import { DraggableStateSnapshot } from 'react-beautiful-dnd'

const TitleContainer = styled(Box)<{ dragging: boolean | undefined }>(
    ({ theme, dragging }) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxShadow:
            dragging && theme.palette.mode === 'dark'
                ? 'inset 0 0 0 10em rgba(255, 255, 255, 0.1)'
                : 'inset 0 0 0 10em rgba(0, 0, 0, 0.1)',

        ':hover': {
            boxShadow:
                theme.palette.mode === 'dark'
                    ? 'inset 0 0 0 10em rgba(255, 255, 255, 0.1)'
                    : 'inset 0 0 0 10em rgba(0, 0, 0, 0.1)',
        },
    })
)

interface Props {
    dragHandle: any
    name: string
    columnId: string
    count: number
    snapshot: DraggableStateSnapshot
    menuOpen: HTMLElement | null
    deleteDialogOpen: () => void
    handleMenuOpen: (e: any) => void
    handleMenuClose: () => void
}

const TasksColumnTitle: React.FC<Props> = ({
    dragHandle,
    name,
    count,
    columnId,
    deleteDialogOpen,
    menuOpen,
    handleMenuOpen,
    handleMenuClose,
    snapshot,
}) => {
    const socket: any = useContext(SocketContext)
    const [editing, setEditing] = useState<boolean>(false)
    const [columnName, setColumnName] = useState<string>(name)

    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const handleEdit = (): void => {
        setEditing(true)
    }

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setColumnName(e.target.value)
    }

    const handleApply = (): void => {
        if (columnName === name || columnName.length < 4) {
            setEditing(false)
            return
        }
        socket.emit('rename_column', { columnName, columnId })
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
        <TitleContainer dragging={snapshot.isDragging ? snapshot.isDragging : undefined}>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                padding='0 20px'
            >
                <Box
                    flex={1}
                    {...dragHandle}
                >
                    {!editing && <Typography fontWeight='bold'>{name}</Typography>}
                    {editing && (
                        <TextField
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
                        badgeContent={count}
                        color='primary'
                        sx={{
                            mr: 2,
                        }}
                    />

                    {!editing && (
                        <>
                            <IconButton
                                onClick={handleMenuOpen}
                                size='small'
                            >
                                <MoreHorizIcon />
                            </IconButton>

                            <TasksColumnTitleMenu
                                menuOpen={menuOpen}
                                handleClose={handleMenuClose}
                                handleEdit={handleEdit}
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
                open={error}
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
        </TitleContainer>
    )
}

export default TasksColumnTitle