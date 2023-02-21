import React, { useState } from 'react'
import { Typography, Paper, Box, styled } from '@mui/material'
import { hexToRgb } from '../../../../helpers/hexToRgb'
import { CompanyUsers } from '../../../../types/company-users.type'
import { LabelI } from '../../../../types/task-label.type'
import { UseStatusReturnI } from '../../../../hooks/useStatusInput'
import { UsePriorityReturnI } from '../../../../hooks/usePriorityInput'
import { UseLabelsReturnI } from '../../../../hooks/useLabelsInput'
import { UseUsersReturnI } from '../../../../hooks/useUsersInput'
import { UserData } from '../../../../types/user-data.type'
import { UseTaskInputReturnI } from '../../../../hooks/useTaskInput'
import { capitalize } from '../../../../helpers/capitalize'
import UserAvatar from '../../../Users/UserAvatar/UserAvatar'
import Label from '../../../Labels/Label'
import TaskStatusSelect from '../../../Inputs/TaskStatusSelect'
import TaskPrioritySelect from '../../../Inputs/TaskPrioritySelect'
import ElementEditButton from './ElementEditButton'
import ElementCopyButton from './ElementCopyButton'
import TaskInput from '../../../Inputs/TaskInput'

const TypographyContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const LabelsContainer = styled(Box)(() => ({
    paddingTop: '5px',
    width: '100%',
    gap: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
}))

const UsersContainer = styled(Box)(() => ({
    paddingTop: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
}))

interface Props {
    caption?: string
    value: string | UserData[] | LabelI[]
    handler?:
        | UsePriorityReturnI
        | UseStatusReturnI
        | UsePriorityReturnI
        | UseStatusReturnI
        | UseLabelsReturnI
        | UseUsersReturnI
        | UseTaskInputReturnI
        | null
    copy?: boolean
    variant?: 'default' | 'selectPriority' | 'selectStatus' | 'labels' | 'users'
    editable?: boolean
    flex?: number
    color?: string
}

const TaskDetailsElement: React.FC<Props> = ({
    value,
    caption = '',
    handler = null,
    copy = false,
    variant = 'default',
    editable = false,
    flex = 1,
    color = '',
}) => {
    const [edit, setEdit] = useState<boolean>(false)

    const handleEditStart = (): void => {
        setEdit(true)
    }

    const handleEditEnd = (): void => {
        setEdit(false)
    }

    const rgb = hexToRgb(color)
    return (
        <Paper
            elevation={4}
            sx={{
                boxShadow: rgb
                    ? `inset 0 0 0 10em rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
                    : '',
                flex,
                maxWidth: '20%',
                minWidth: '300px',
                pt: 1,
                pb: 1,
                pl: 2,
                pr: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant='caption'>{caption}</Typography>
                {editable || copy ? (
                    <>
                        {editable && (
                            <ElementEditButton
                                edit={edit}
                                handleEditStart={handleEditStart}
                            />
                        )}

                        {copy && <ElementCopyButton value={value as string} />}
                    </>
                ) : (
                    <Box height='32px'></Box>
                )}
            </Box>

            {variant === 'default' && (
                <TypographyContainer>
                    {edit ? (
                        <TaskInput
                            inputHandler={handler as UseTaskInputReturnI}
                            taskEdit
                            handleEditEnd={handleEditEnd}
                        />
                    ) : (
                        <Typography
                            variant='h5'
                            sx={{
                                mt: 1,
                                wordBreak: 'break-word',
                                maxWidth: '100%',
                            }}
                        >
                            {value as string}
                        </Typography>
                    )}
                </TypographyContainer>
            )}

            {variant === 'selectPriority' && (
                <TypographyContainer>
                    {edit ? (
                        <TaskPrioritySelect
                            priorityHandler={handler as UsePriorityReturnI}
                            taskEdit
                            handleEditEnd={handleEditEnd}
                        />
                    ) : (
                        <Typography
                            variant='h5'
                            sx={{
                                mt: 1,
                                wordBreak: 'break-word',
                                maxWidth: '100%',
                            }}
                        >
                            {capitalize(value as string)}
                        </Typography>
                    )}
                </TypographyContainer>
            )}

            {variant === 'selectStatus' && (
                <TypographyContainer>
                    {edit ? (
                        <TaskStatusSelect
                            statusHandler={handler as UseStatusReturnI}
                            taskEdit
                            handleEditEnd={handleEditEnd}
                        />
                    ) : (
                        <Typography
                            variant='h5'
                            sx={{
                                mt: 1,
                                wordBreak: 'break-word',
                                maxWidth: '100%',
                            }}
                        >
                            {value as string}
                        </Typography>
                    )}
                </TypographyContainer>
            )}

            {variant === 'users' && (
                <UsersContainer>
                    {(value as CompanyUsers[]).map((user) => (
                        <Box
                            key={user.userId}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <UserAvatar
                                id={user.userId}
                                firstName={user.firstName!}
                                lastName={user.lastName!}
                                size={32}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Typography variant='caption'>{user.username}</Typography>
                            </Box>
                        </Box>
                    ))}
                </UsersContainer>
            )}

            {variant === 'labels' && (
                <LabelsContainer>
                    {(value as LabelI[]).map((label) => (
                        <Label
                            key={label.label}
                            label={label.label}
                            color={label.color}
                            description={label.description}
                        />
                    ))}
                </LabelsContainer>
            )}
        </Paper>
    )
}

export default TaskDetailsElement
