import React from 'react'
import { styled, lighten, Tooltip, Chip } from '@mui/material'
import { hexToRgb, Irgb } from '../../helpers/hexToRgb'

interface Props {
    label: string
    description?: string
    size?: 'small' | 'medium' | undefined
    color?: string
    tagProps?: any
}

const StyledChip = styled(Chip)<{ background: string; rgb: Irgb | null }>(
    ({ theme, background, rgb }) => {
        if (theme.palette.mode === 'dark') {
            return {
                padding: 0,
                fontWeight: 'bold',
                backgroundColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` : '',
                textTransform: 'capitalize',
                color: rgb ? lighten(background, 0.3) : '',
                border: `0.5px solid`,
                borderColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : '',
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                cursor: 'pointer',
            }
        } else {
            return {
                fontWeight: 'bold',
                backgroundColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : '',
                textTransform: 'capitalize',
                color: rgb ? theme.palette.getContrastText(background) : '',
                border: `0.5px solid`,
                borderColor: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : '',
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

const Label: React.FC<Props> = ({
    label,
    description = '',
    size = 'small',
    color = '#EFEFEF',
    tagProps,
}) => {
    const rgb = hexToRgb(color)

    return (
        <Tooltip
            title={description}
            arrow
        >
            <StyledChip
                label={label}
                background={color}
                rgb={rgb}
                size={size}
                {...tagProps}
            />
        </Tooltip>
    )
}

export default Label
