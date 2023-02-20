import React from 'react'
import { TextField } from '@mui/material'
import { UseTaskInputReturnI } from '../../hooks/useTaskInput'

interface Props {
    inputHandler: UseTaskInputReturnI
}

const TaskInput: React.FC<Props> = ({ inputHandler }) => {
    const { hasError, valueChangeHandler, inputBlurHandler } = inputHandler.input
    const { label } = inputHandler

    return (
        <TextField
            required
            margin='normal'
            id={label}
            label={label}
            variant='standard'
            fullWidth
            error={hasError}
            helperText={hasError ? `${label} not valid` : ''}
            onChange={(e) => valueChangeHandler(e)}
            onBlur={(e) => inputBlurHandler(e)}
        />
    )
}

export default TaskInput
