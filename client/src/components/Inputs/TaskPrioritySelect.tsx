import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { Priority } from '../../types/priority-enum'
import { setPriorityColor } from '../../helpers/setPriorityColor'
import { capitalize } from '../../helpers/capitalize'
import { UsePriorityReturnI } from '../../hooks/usePriorityInput'

interface Props {
    priorityHandler: UsePriorityReturnI
    taskEdit?: boolean
    handleEditEnd?: () => void
}

const TaskPrioritySelect: React.FC<Props> = ({
    priorityHandler,
    taskEdit = false,
    handleEditEnd,
}) => {
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
            {!taskEdit && <InputLabel id='priorityLabel'>Priority</InputLabel>}
            <Select
                autoFocus={taskEdit}
                value={priorityValue || ''}
                label={taskEdit ? null : 'Priority'}
                variant={taskEdit ? 'standard' : 'outlined'}
                labelId='priorityLabel'
                id='priority'
                onChange={priorityChangeHandler}
                onBlur={taskEdit ? handleEditEnd : priorityBlurHandler}
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
