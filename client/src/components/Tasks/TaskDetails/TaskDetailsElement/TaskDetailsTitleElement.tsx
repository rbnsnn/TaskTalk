import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { UseTaskInputReturnI } from '../../../../hooks/useTaskInput'
import TaskInput from '../../../Inputs/TaskInput'
import ElementEditButton from './ElementEditButton'

interface Props {
    editable?: boolean
    value: string
    handler: UseTaskInputReturnI
}

const TaskDetailsTitleElement: React.FC<Props> = ({
    editable = false,
    handler,
    value,
}) => {
    const [edit, setEdit] = useState<boolean>(false)

    const handleEditStart = (): void => {
        setEdit(true)
    }

    const handleEditEnd = (): void => {
        setEdit(false)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            {edit ? (
                <TaskInput
                    inputHandler={handler}
                    taskEdit
                    handleEditEnd={handleEditEnd}
                />
            ) : (
                <Typography
                    variant='h4'
                    sx={{
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                    }}
                >
                    {value}
                </Typography>
            )}
            {editable && (
                <ElementEditButton
                    edit={edit}
                    handleEditStart={handleEditStart}
                />
            )}
        </Box>
    )
}

export default TaskDetailsTitleElement
