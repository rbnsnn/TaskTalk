import { styled, Box } from '@mui/material'

export const TasksColumnTitleContainer = styled(Box)<{
    dragging: number
    color: string
}>(({ theme, dragging, color }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color,
    color: color ? theme.palette.getContrastText(color) : '',
    width: '100%',
    boxShadow: dragging
        ? theme.palette.mode === 'dark'
            ? 'inset 0 0 0 20em rgba(255, 255, 255, 0.05)'
            : 'inset 0 0 0 20em rgba(0, 0, 0, 0.05)'
        : '',
    transition: '0.3s ease-in-out',

    ':hover': {
        boxShadow:
            theme.palette.mode === 'dark'
                ? 'inset 0 0 0 10em rgba(255, 255, 255, 0.05)'
                : 'inset 0 0 0 10em rgba(0, 0, 0, 0.05)',
    },
}))
