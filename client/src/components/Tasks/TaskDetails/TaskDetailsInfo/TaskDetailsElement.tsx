import React from 'react'
import { Typography, Paper, Box, Button, styled } from '@mui/material'
import { hexToRgb } from '../../../../helpers/hexToRgb'
import { CompanyUsers } from '../../../../types/company-users.type'
import { LabelI } from '../../../../types/task-label.type'
import EditIcon from '@mui/icons-material/Edit'
import UserAvatar from '../../../Users/UserAvatar/UserAvatar'
import Label from '../../../Labels/Label'

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
    value: string | CompanyUsers[] | LabelI[]
    variant?: 'typography' | 'labels' | 'users'
    editable?: boolean
    flex?: number
    color?: string
}

const TaskDetailsElement: React.FC<Props> = ({
    caption,
    value,
    variant = 'typography',
    editable = false,
    flex = 1,
    color = '',
}) => {
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
                {editable ? (
                    <StyledButton size='small'>
                        <EditIcon sx={{ mr: 2 }} />
                        Edit
                    </StyledButton>
                ) : (
                    <Box height='32px'></Box>
                )}
            </Box>

            {variant === 'typography' && (
                <TypographyContainer>
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
