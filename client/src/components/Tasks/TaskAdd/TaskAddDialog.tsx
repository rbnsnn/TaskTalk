import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    DialogActions,
    Button,
    InputLabel,
    Autocomplete,
    CircularProgress,
    FormHelperText,
} from '@mui/material'
import { useApi } from '../../../hooks/useApi'
import { UserData } from '../../../types/user-data.type'
import { useInput } from '../../../hooks/useInput'
import { isLongerThan } from '../../../helpers/formHelper'
import { TaskData } from '../../../types/task-data.type'
import { Priority } from '../../../types/priority-enum'
import { isNotEmpty } from '../../../helpers/formHelper'
import { LabelI } from '../../../types/task-label.type'
import { ColumnData } from '../../../types/column-data.type'
import { SocketContext } from '../../../helpers/socket/socket-context'
import { capitalize } from '../../../helpers/capitalize'
import { setPriorityColor } from '../../../helpers/setPriorityColor'
import Label from '../../Labels/Label'

interface Props {
    open: boolean
    close: () => void
}
const TaskAddDialog: React.FC<Props> = ({ open, close }) => {
    const socket: any = useContext(SocketContext)

    const [assignedUsers, setAssignedUsers] = useState<UserData[]>([])
    const [assignedUsersHasError, setAssignedUsersHasError] = useState<boolean>(false)
    const {
        data: usersData,
        reset: resetUsers,
        executeFetch: refetchUsers,
    } = useApi('users/all', 'GET', false)

    const [assignedStatus, setAssignedStatus] = useState<ColumnData | null>(null)
    const [assignedStatusHasError, setAssignedStatusHasError] = useState<boolean>(false)
    const [assignedStatusTouched, setAssignedStatusTouched] = useState<boolean>(false)
    const {
        data: statusData,
        reset: resetStatus,
        executeFetch: refetchStatus,
    } = useApi('companies/names', 'GET', false)

    const [assignedLabels, setAssignedLabels] = useState<LabelI[]>([])
    const {
        data: labelsData,
        reset: resetLabels,
        executeFetch: refetchLabels,
    } = useApi('companies/labels', 'GET', false)

    const { success, error, loading, executeFetch, reset } = useApi(
        'tasks/new',
        'POST',
        false
    )
    const fetchData = async () => {
        await refetchStatus()
        await refetchUsers()
        await refetchLabels()
    }

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
    } = useInput(isLongerThan(4))

    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput(isLongerThan(10))

    const {
        value: priorityValue,
        isValid: priorityIsValid,
        hasError: priorityHasError,
        valueChangeHandler: priorityChangeHandler,
        inputBlurHandler: priorityBlurHandler,
        reset: priorityReset,
    } = useInput(isNotEmpty)

    const handleSubmit = async (): Promise<any> => {
        const assignes = assignedUsers.map((user: UserData) => ({
            userId: user.userId!,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }))

        const newTask: TaskData = {
            taskId: '',
            assignedUsers: assignes,
            status: { name: assignedStatus!.name, color: assignedStatus!.color },
            assignedColumn: assignedStatus!.columnId,
            priority: priorityValue,
            labels: assignedLabels,
            title: titleValue,
            description: descriptionValue,
        }
        await executeFetch(newTask)
        socket.emit('create_task')
    }

    const handleReset = useCallback((): void => {
        titleReset()
        descriptionReset()
        setAssignedUsers([])
        setAssignedStatus(null)
        priorityReset()
        resetStatus()
        resetLabels()
        resetUsers()
        reset()
    }, [
        titleReset,
        descriptionReset,
        reset,
        priorityReset,
        resetStatus,
        resetLabels,
        resetUsers,
    ])

    const handleCancel = useCallback((): void => {
        close()
        setTimeout(() => handleReset(), 1000)
    }, [close, handleReset])

    let formIsValid = false

    if (
        titleIsValid &&
        descriptionIsValid &&
        priorityIsValid &&
        assignedUsers.length > 0 &&
        !assignedStatusHasError &&
        assignedStatusTouched
    ) {
        formIsValid = true
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!success) {
            return
        }
        const userAdded = setTimeout(() => {
            handleCancel()
        }, 1000)

        return () => {
            clearTimeout(userAdded)
        }
    }, [success, handleCancel, reset])

    return (
        <Dialog
            fullWidth
            open={open}
        >
            <DialogTitle align='center'>Add new task</DialogTitle>
            <DialogContent>
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TextField
                        required
                        margin='normal'
                        id='title'
                        label='Title'
                        variant='standard'
                        fullWidth
                        error={titleHasError}
                        helperText={titleHasError ? 'title not valid' : ''}
                        onChange={(e) => titleChangeHandler(e)}
                        onBlur={(e) => titleBlurHandler(e)}
                    />
                </Box>
                <Autocomplete
                    sx={{ mt: 2 }}
                    multiple
                    limitTags={4}
                    id='assigned-users'
                    options={usersData ? usersData : []}
                    getOptionLabel={(option: UserData) => option.username}
                    renderOption={(props, option) => (
                        <Box
                            component='li'
                            {...props}
                        >
                            {option.username}{' '}
                            {option.firstName && option.lastName
                                ? `(${option.firstName} ${option.lastName})`
                                : ''}
                        </Box>
                    )}
                    filterSelectedOptions
                    value={assignedUsers}
                    onChange={(event: any, newValue: UserData[] | [], reason: string) => {
                        if (reason === 'clear') {
                            setAssignedUsers([])
                            setAssignedUsersHasError(true)
                        } else {
                            setAssignedUsers(newValue)
                            setAssignedUsersHasError(false)
                        }
                    }}
                    onBlur={() => {
                        if (assignedUsers.length === 0) {
                            setAssignedUsersHasError(true)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            error={assignedUsersHasError}
                            helperText={
                                assignedUsersHasError ? 'Assigned users not valid' : ''
                            }
                            required
                            {...params}
                            label='Assign task to'
                        />
                    )}
                />
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <Autocomplete
                        fullWidth
                        sx={{ mt: 2 }}
                        id='assigned-status'
                        options={statusData ? statusData : []}
                        getOptionLabel={(option: ColumnData) => option.name}
                        filterSelectedOptions
                        value={assignedStatus}
                        onChange={(event: any, newValue: any, reason: string) => {
                            if (reason === 'clear') {
                                setAssignedStatus(null)
                                setAssignedStatusHasError(true)
                                setAssignedStatusTouched(true)
                            } else {
                                setAssignedStatus(newValue)
                                setAssignedStatusHasError(false)
                                setAssignedStatusTouched(true)
                            }
                        }}
                        onBlur={() => {
                            if (!assignedStatus) {
                                setAssignedStatusHasError(true)
                                setAssignedStatusTouched(true)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                error={assignedStatusHasError}
                                helperText={
                                    assignedStatusHasError ? 'status not valid' : ''
                                }
                                required
                                {...params}
                                label='Status'
                            />
                        )}
                    />
                    <FormControl
                        fullWidth
                        required
                        margin='normal'
                        error={priorityHasError}
                    >
                        <InputLabel id='priorityLabel'>Priority</InputLabel>
                        <Select
                            value={priorityValue || ''}
                            label='Priority'
                            labelId='priorityLabel'
                            id='priority'
                            onChange={priorityChangeHandler}
                            onBlur={priorityBlurHandler}
                        >
                            {(Object.keys(Priority) as Array<keyof typeof Priority>).map(
                                (item) => {
                                    return (
                                        <MenuItem
                                            key={item}
                                            value={item.toLowerCase()}
                                            sx={{
                                                color: setPriorityColor(
                                                    item.toLowerCase()
                                                ),
                                            }}
                                        >
                                            {capitalize(item)}
                                        </MenuItem>
                                    )
                                }
                            )}
                        </Select>
                        {priorityHasError && (
                            <FormHelperText>priority not valid</FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <Autocomplete
                    sx={{ mt: 2 }}
                    fullWidth
                    multiple
                    limitTags={4}
                    id='assigned-labels'
                    options={labelsData ? labelsData : []}
                    getOptionLabel={(option: LabelI) => option.label}
                    renderOption={(props, option) => (
                        <Box
                            component='li'
                            {...props}
                        >
                            <Label
                                label={option.label}
                                color={option.color}
                            />
                        </Box>
                    )}
                    filterSelectedOptions
                    value={assignedLabels}
                    onChange={(event: any, newValue: LabelI[] | [], reason: string) => {
                        if (reason === 'clear') {
                            setAssignedLabels([])
                        } else {
                            setAssignedLabels(newValue)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Labels'
                        />
                    )}
                    renderTags={(value: LabelI[], getTagProps) =>
                        value.map((option: LabelI, index) => (
                            <Label
                                key={option.label}
                                label={option.label}
                                color={option.color}
                                tagProps={{ ...getTagProps({ index }) }}
                            />
                        ))
                    }
                />

                <Box>
                    <TextField
                        required
                        multiline
                        margin='normal'
                        id='description'
                        label='Description'
                        variant='standard'
                        fullWidth
                        error={descriptionHasError}
                        helperText={descriptionHasError ? 'description not valid' : ''}
                        onChange={(e) => descriptionChangeHandler(e)}
                        onBlur={(e) => descriptionBlurHandler(e)}
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mb: 2,
                }}
            >
                {error && <Alert severity='error'>{error}</Alert>}
                {success && <Alert severity='success'>Task created successfully!</Alert>}
                {loading && <CircularProgress />}

                {!success && (
                    <>
                        <Button
                            color='error'
                            variant='contained'
                            size='large'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!formIsValid}
                            variant='contained'
                            size='large'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default TaskAddDialog
