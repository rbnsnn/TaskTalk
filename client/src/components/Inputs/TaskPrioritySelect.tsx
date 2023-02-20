import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { Priority } from '../../types/priority-enum'
import { setPriorityColor } from '../../helpers/setPriorityColor'
import { capitalize } from '../../helpers/capitalize'
import { UsePriorityReturnI } from '../../hooks/usePriorityInput'

interface Props {
    priorityHandler: UsePriorityReturnI
}

const TaskPrioritySelect: React.FC<Props> = ({ priorityHandler }) => {
    const {
        priorityValue,
        priorityHasError,
        priorityBlurHandler,
        priorityChangeHandler,
    } = priorityHandler.priority
    return (
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
                {(Object.keys(Priority) as Array<keyof typeof Priority>).map((item) => {
                    return (
                        <MenuItem
                            key={item}
                            value={item.toLowerCase()}
                            sx={{
                                color: setPriorityColor(item.toLowerCase()),
                            }}
                        >
                            {capitalize(item)}
                        </MenuItem>
                    )
                })}
            </Select>
            {priorityHasError && <FormHelperText>priority not valid</FormHelperText>}
        </FormControl>
    )
}

export default TaskPrioritySelect
