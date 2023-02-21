import React from 'react'
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import { useTaskAddDialogHandler } from '../../../hooks/useTaskAddDialogHandler'
import TaskLabelsSelect from '../../Inputs/TaskLabelsSelect'
import TaskStatusSelect from '../../Inputs/TaskStatusSelect'
import TaskUsersSelect from '../../Inputs/TaskUsersSelect'
import TaskPrioritySelect from '../../Inputs/TaskPrioritySelect'
import TaskInput from '../../Inputs/TaskInput'
import TaskAddDialogActions from './TaskAddDialogActions'

interface Props {
    open: boolean
    close: () => void
}
const TaskAddDialog: React.FC<Props> = ({ open, close }) => {
    const { handlers, dialog, dialogApi } = useTaskAddDialogHandler(close)
    const {
        statusHandler,
        usersHandler,
        labelsHandler,
        priorityHandler,
        titleHandler,
        descriptionHandler,
    } = handlers

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
                    <TaskInput inputHandler={titleHandler} />
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
                    <TaskPrioritySelect priorityHandler={priorityHandler} />
                </Box>
                <TaskLabelsSelect labelsHandler={labelsHandler} />

                <Box>
                    <TaskInput inputHandler={descriptionHandler} />
                </Box>
            </DialogContent>

            <TaskAddDialogActions
                dialog={dialog}
                dialogApi={dialogApi}
            />
        </Dialog>
    )
}

export default TaskAddDialog
