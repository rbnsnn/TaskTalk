import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { ColumnData } from '../../types/column-data.type'
import { UseStatusReturnI } from '../../hooks/useStatusInput'

interface Props {
    statusHandler: UseStatusReturnI
}

const TaskStatusSelect: React.FC<Props> = ({ statusHandler }) => {
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
            }}
            renderInput={(params) => (
                <TextField
                    error={assignedStatusHasError}
                    helperText={assignedStatusHasError ? 'status not valid' : ''}
                    required
                    {...params}
                    label='Status'
                />
            )}
        />
    )
}

export default TaskStatusSelect
