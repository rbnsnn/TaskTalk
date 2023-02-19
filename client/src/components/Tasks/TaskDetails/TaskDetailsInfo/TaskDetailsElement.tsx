import React, { useState } from 'react'
import {
    Typography,
    Paper,
    Box,
    Button,
    TextField,
    Select,
    FormControl,
    Autocomplete,
    MenuItem,
    styled,
} from '@mui/material'
import { hexToRgb } from '../../../../helpers/hexToRgb'
import { CompanyUsers } from '../../../../types/company-users.type'
import { LabelI } from '../../../../types/task-label.type'
import { Priority } from '../../../../types/priority-enum'
import { setPriorityColor } from '../../../../helpers/setPriorityColor'
import { capitalize } from '../../../../helpers/capitalize'
import { useApi } from '../../../../hooks/useApi'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import UserAvatar from '../../../Users/UserAvatar/UserAvatar'
import Label from '../../../Labels/Label'
import { ColumnData } from '../../../../types/column-data.type'

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

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#eee' : '',
}))

interface Props {
    caption: string
    value: string | CompanyUsers[] | LabelI[] | ColumnData[] | null
    setValue?: any
    copy?: boolean
    variant?: 'typography' | 'selectPriority' | 'selectStatus' | 'labels' | 'users'
    editable?: boolean
    flex?: number
    color?: string
}

const TaskDetailsElement: React.FC<Props> = ({
    caption,
    value,
    setValue = null,
    copy = false,
    variant = 'typography',
    editable = false,
    flex = 1,
    color = '',
}) => {
    const {
        data: statusData,
        reset: resetStatus,
        executeFetch: refetchStatus,
    } = useApi('companies/names', 'GET')
    const [edit, setEdit] = useState<boolean>(false)
    console.log(statusData)
    const handleEditStart = (): void => {
        setEdit(true)
    }
    const handleEditEnd = (): void => {
        setEdit(false)
    }

    const handleChange = (event: any) => {
        setValue(event.target.value)
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
                            <StyledButton
                                size='small'
                                onClick={handleEditStart}
                            >
                                <EditIcon sx={{ mr: 2 }} />
                                Edit
                            </StyledButton>
                        )}

                        {copy && (
                            <StyledButton
                                size='small'
                                onClick={() => {
                                    navigator.clipboard.writeText(value as string)
                                }}
                            >
                                <ContentCopyIcon sx={{ mr: 2 }} />
                                Copy
                            </StyledButton>
                        )}
                    </>
                ) : (
                    <Box height='32px'></Box>
                )}
            </Box>

            {variant === 'typography' && (
                <TypographyContainer>
                    {edit ? (
                        <TextField
                            id={caption}
                            autoFocus
                            variant='standard'
                            multiline
                            value={value}
                            onChange={handleChange}
                            onBlur={handleEditEnd}
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
                        <FormControl
                            fullWidth
                            required
                        >
                            <Select
                                value={value}
                                labelId='priorityLabel'
                                variant='standard'
                                id='priority'
                                onChange={handleChange}
                                onBlur={handleEditEnd}
                            >
                                {(
                                    Object.keys(Priority) as Array<keyof typeof Priority>
                                ).map((item) => {
                                    return (
                                        <MenuItem
                                            key={item}
                                            value={item.toLowerCase()}
                                            sx={{
                                                color: setPriorityColor(
                                                    item.toLowerCase()
                                                ),
                                            }}
                                        >
                                            {capitalize(item)}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
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

            {variant === 'selectStatus' && (
                <TypographyContainer>
                    {edit ? (
                        <Autocomplete
                            fullWidth
                            sx={{ mt: 2 }}
                            id='assigned-status'
                            options={statusData ? statusData : []}
                            getOptionLabel={(option: any) => option.name}
                            filterSelectedOptions
                            value={value as ColumnData[]}
                            onChange={(event: any, newValue: any, reason: string) => {
                                if (reason === 'clear') {
                                    setValue(null)
                                    // setAssignedStatusHasError(true)
                                    // setAssignedStatusTouched(true)
                                } else {
                                    setValue(newValue)
                                    // setAssignedStatusHasError(false)
                                    // setAssignedStatusTouched(true)
                                }
                            }}
                            onBlur={() => {
                                handleEditEnd()
                                // if (!assignedStatus) {
                                //     setAssignedStatusHasError(true)
                                //     setAssignedStatusTouched(true)
                                // }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    // error={assignedStatusHasError}
                                    // helperText={
                                    //     assignedStatusHasError ? 'status not valid' : ''
                                    // }
                                    required
                                    {...params}
                                    label='Status'
                                />
                            )}
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
