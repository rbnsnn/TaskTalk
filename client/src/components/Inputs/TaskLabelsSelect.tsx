import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { UseLabelsReturnI } from '../../hooks/useLabelsInput'
import { LabelI } from '../../types/task-label.type'
import Label from '../Labels/Label'

interface Props {
    labelsHandler: UseLabelsReturnI
}

const TaskLabelsSelect: React.FC<Props> = ({ labelsHandler }) => {
    const { assignedLabels, setAssignedLabels } = labelsHandler.labels
    const { labelsData } = labelsHandler.labelsApi

    return (
        <Autocomplete
            sx={{ mt: 2 }}
            fullWidth
            multiple
            limitTags={4}
            id='assigned-labels'
            options={labelsData ? labelsData : []}
            getOptionLabel={(option: LabelI) => option.label}
            renderOption={(props, option) => (
                <Box
                    component='li'
                    {...props}
                >
                    <Label
                        label={option.label}
                        color={option.color}
                    />
                </Box>
            )}
            filterSelectedOptions
            value={assignedLabels}
            onChange={(event: any, newValue: LabelI[] | [], reason: string) => {
                if (reason === 'clear') {
                    setAssignedLabels([])
                } else {
                    setAssignedLabels(newValue)
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Labels'
                />
            )}
            renderTags={(value: LabelI[], getTagProps) =>
                value.map((option: LabelI, index) => (
                    <Label
                        key={option.label}
                        label={option.label}
                        color={option.color}
                        tagProps={{ ...getTagProps({ index }) }}
                    />
                ))
            }
        />
    )
}

export default TaskLabelsSelect
