import React from 'react'
import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    DialogActions,
    Button,
    CircularProgress,
} from '@mui/material'
import TaskLabelsSelect from '../../Inputs/TaskLabelsSelect'
import TaskStatusSelect from '../../Inputs/TaskStatusSelect'
import TaskUsersSelect from '../../Inputs/TaskUsersSelect'
import TaskPrioritySelect from '../../Inputs/TaskPrioritySelect'
import { useTaskAddDialogHandler } from '../../../hooks/useTaskAddDialogHandler'
import TaskInput from '../../Inputs/TaskInput'

interface Props {
    open: boolean
    close: () => void
}
const TaskAddDialog: React.FC<Props> = ({ open, close }) => {
    const { handlers, dialog, dialogApi } = useTaskAddDialogHandler(close)

    const { statusHandler, usersHandler, labelsHandler } = handlers
    const { handleCancel, handleSubmit, formIsValid } = dialog
    const { error, success, loading } = dialogApi

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
                    <TaskInput
                        inputHandler={}
                        tittle='Title'
                    />
                </Box>
                <TaskUsersSelect usersHandler={usersHandler} />
                <Box
                    justifyContent='space-around'
                    gap='5%'
                    sx={{
                        display: { sx: 'block', sm: 'flex' },
                    }}
                >
                    <TaskStatusSelect statusHandler={statusHandler} />
                    <TaskPrioritySelect
                        priorityValue={priorityValue}
                        priorityHasError={priorityHasError}
                        priorityBlurHandler={priorityBlurHandler}
                        priorityChangeHandler={priorityChangeHandler}
                    />
                </Box>
                <TaskLabelsSelect labelsHandler={labelsHandler} />

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
