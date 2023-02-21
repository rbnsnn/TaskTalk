import React from 'react'
import { Button } from '@mui/material'
import {
    CheckUpdate,
    checkUpdateAvaiable,
} from '../../../../helpers/TaskDetails/checkUpdateAvaiable'

const TaskDetailsSaveChangesButton: React.FC<CheckUpdate> = ({
    data,
    handlersValues,
}) => {
    const disabled = checkUpdateAvaiable({ data, handlersValues })
    // console.log(disabled)
    return (
        <Button
            disabled={disabled}
            size='small'
            variant='contained'
        >
            Save Changes
        </Button>
    )
}

export default TaskDetailsSaveChangesButton
