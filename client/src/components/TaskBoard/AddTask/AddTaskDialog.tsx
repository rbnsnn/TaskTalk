import React, { useState, useEffect, useCallback } from 'react'
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
} from '@mui/material'
import { useApi } from '../../../hooks/useApi'
import { UserData } from '../../../types/user-data.type'
import { useInput } from '../../../hooks/useInput'
import { isLongerThan } from '../../../helpers/formHelper'
import { TaskData } from '../../../types/task-data.type'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { Priority } from '../../../types/priority-enum'
import { isNotEmpty } from '../../../helpers/formHelper'
import { TaskLabel } from '../../../types/task-label.type'

interface Props {
    open: boolean
    close: () => void
}
const AddTaskDialog: React.FC<Props> = ({ open, close }) => {
    const user = useAppSelector((state) => state.auth.user)
    const [assignedUsers, setAssignedUsers] = useState<UserData[]>([])
    const [labels, setLabels] = useState<TaskLabel[]>([])
    const { data } = useApi('users/all', 'GET')
    const { success, error, loading, executeFetch, reset } = useApi(
        'tasks/new',
        'POST',
        false
    )

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

    const handleSubmit = (): void => {
        const assignes = assignedUsers.map((user: UserData) => ({
            userId: user.userId!,
            username: user.username,
        }))

        const newTask: TaskData = {
            companyId: user.companyId,
            createdBy: user.username,
            created: new Date(),
            assignedUsers: assignes,
            status: 'string',
            priority: priorityValue,
            labels: [],
            title: titleValue,
            description: descriptionValue,
        }
        executeFetch(newTask)
    }

    const handleReset = useCallback((): void => {
        titleReset()
        descriptionReset()
        setAssignedUsers([])
        priorityReset()
        reset()
    }, [titleReset, descriptionReset, reset, priorityReset])

    const handleCancel = useCallback((): void => {
        close()
        setTimeout(() => handleReset(), 1000)
    }, [close, handleReset])

    let formIsValid = false

    if (
        titleIsValid &&
        descriptionIsValid &&
        priorityIsValid &&
        assignedUsers.length > 0
    ) {
        formIsValid = true
    }

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
                    fullWidth
                    id='assigned-users'
                    options={data ? data : []}
                    getOptionLabel={(option: UserData) => option.username}
                    filterSelectedOptions
                    value={assignedUsers}
                    onChange={(event: any, newValue: UserData[] | []) => {
                        setAssignedUsers(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
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
                    <FormControl
                        sx={{ width: '30%' }}
                        required
                        margin='normal'
                        variant='standard'
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
                            <MenuItem value={Priority.UNDEFINED}>Undefined</MenuItem>
                            <MenuItem value={Priority.LOW}>Low</MenuItem>
                            <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
                            <MenuItem value={Priority.HIGH}>High</MenuItem>
                        </Select>
                    </FormControl>
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
                <Box>
                    <Autocomplete
                        sx={{ mt: 2 }}
                        multiple
                        fullWidth
                        id='task-labels'
                        options={data ? data : []}
                        getOptionLabel={(option: UserData) => option.username}
                        filterSelectedOptions
                        value={assignedUsers}
                        onChange={(event: any, newValue: UserData[] | []) => {
                            setAssignedUsers(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Labels'
                            />
                        )}
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

export default AddTaskDialog
