import React from 'react'
import { TextField } from '@mui/material'
// import inputHandler

interface Props {
    inputHandler: any
    tittle: string
}

const TaskInput: React.FC<Props> = ({ inputHandler, tittle }) => {
    const { hasError, changeHandler, blurHandler } = inputHandler()
    return (
        <TextField
            required
            margin='normal'
            id={tittle}
            label={tittle}
            variant='standard'
            fullWidth
            error={hasError}
            helperText={hasError ? 'title not valid' : ''}
            onChange={(e) => changeHandler(e)}
            onBlur={(e) => blurHandler(e)}
        />
    )
}

export default TaskInput
