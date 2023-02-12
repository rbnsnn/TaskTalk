import React from 'react'
import { styled, lighten } from '@mui/material'
import { hexToRgb, Irgb } from '../../../helpers/hexToRgb'

interface Props {
    label: string
    size?: number
    color?: string
}

const Label = styled('div')<{ size: number; rgb: Irgb | null; color: string }>(
    ({ theme, size, rgb, color }) => {
        if (theme.palette.mode === 'dark') {
            return {
                padding: 10,
                fontWeight: 'bold',
                backgroundColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` : '',
                textTransform: 'capitalize',
                color: rgb ? lighten(color, 0.2) : '',
                border: `0.5px solid`,
                borderColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : '',
                borderRadius: size,
                fontSize: size / 2,
                height: size,
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '5px',
                cursor: 'pointer',

                // '&:hover': {
                //     boxShadow: 'inset 0 0 100px 100px rgba(0, 0, 0, 0.2)',
                // },
            }
        } else {
            return {
                padding: 10,
                fontWeight: 'bold',
                backgroundColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : '',
                textTransform: 'capitalize',
                color: rgb ? theme.palette.getContrastText(color) : '',
                border: `0.5px solid`,
                borderColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : '',
                borderRadius: size,
                fontSize: size / 2,
                height: size,
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '5px',
                cursor: 'pointer',
            }
        }
    }
)

const TaskLabel: React.FC<Props> = ({ label, size = 24, color = '#10FDDB' }) => {
    const rgb = hexToRgb(color)

    return (
        <Label
            size={size}
            rgb={rgb}
            color={color}
        >
            {label}
        </Label>
    )
}

export default TaskLabel
