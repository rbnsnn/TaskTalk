import React from 'react'
import { TextField } from '@mui/material'
import { UseTaskInputReturnI } from '../../hooks/useTaskInput'

interface Props {
    inputHandler: UseTaskInputReturnI
    taskEdit?: boolean
    handleEditEnd?: () => void
}

const TaskInput: React.FC<Props> = ({
    inputHandler,
    taskEdit = false,
    handleEditEnd,
}) => {
    const {
        value,
        setValue,
        hasError,
        valueChangeHandler,
        valueChangeHandlerTouched,
        inputBlurHandler,
    } = inputHandler.input
    const { label, initValue } = inputHandler

    const onBlur = (e: any): void => {
        if (taskEdit) {
            handleEditEnd!()
            if (hasError) {
                setValue(initValue)
            }
        }
        inputBlurHandler(e)
    }

    const onChange = (e: any): void => {
        if (taskEdit) {
            valueChangeHandlerTouched(e)
        } else {
            valueChangeHandler(e)
        }
    }

    return (
        <TextField
            autoFocus={taskEdit}
            required
            margin='normal'
            id={label}
            label={taskEdit ? null : label}
            variant='standard'
            multiline={label === 'Description'}
            fullWidth={!taskEdit}
            value={value}
            error={hasError}
            helperText={hasError ? `${label} not valid` : ''}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            sx={{
                margin: taskEdit ? '0' : null,
                input: {
                    fontSize: taskEdit ? '23px' : null,
                },
            }}
        />
    )
}

export default TaskInput
