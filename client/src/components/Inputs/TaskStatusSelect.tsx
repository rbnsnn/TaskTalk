import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { ColumnData } from '../../types/column-data.type'
import { UseStatusReturnI } from '../../hooks/useStatusInput'

interface Props {
    statusHandler: UseStatusReturnI
    taskEdit?: boolean
    handleEditEnd?: () => void
}

const TaskStatusSelect: React.FC<Props> = ({
    statusHandler,
    taskEdit = false,
    handleEditEnd,
}) => {
    const {
        assignedStatus,
        setAssignedStatus,
        assignedStatusHasError,
        setAssignedStatusHasError,
        setAssignedStatusTouched,
    } = statusHandler.status

    const { statusData } = statusHandler.statusApi

    return (
        <Autocomplete
            disableClearable={taskEdit}
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
                if (taskEdit) {
                    handleEditEnd!()
                }
            }}
            renderInput={(params) => (
                <TextField
                    autoFocus={taskEdit}
                    variant={taskEdit ? 'standard' : 'outlined'}
                    error={assignedStatusHasError}
                    helperText={assignedStatusHasError ? 'status not valid' : ''}
                    required
                    {...params}
                    label={taskEdit ? null : 'Status'}
                />
            )}
        />
    )
}

export default TaskStatusSelect
