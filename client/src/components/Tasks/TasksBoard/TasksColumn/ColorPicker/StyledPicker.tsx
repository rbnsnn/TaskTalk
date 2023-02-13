import { Box, styled } from '@mui/system'
import React from 'react'

const colors = [
    '#B80000',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#006B76',
    '#1273DE',
    '#004DCF',
    '#5300EB',
    '#EB9694',
    '#FAD0C3',
    '#FEF3BD',
    '#C1E1C5',
    '#BEDADC',
    '#C4DEF6',
    '#BED3F3',
    '#D4C4FB',
]

const ColorsContainer = styled('div')(({ theme }) => ({
    boxSizing: 'content-box',
    padding: '5px',
    display: 'inline-flex',
    flexWrap: 'wrap',
    flex: 'suto',
    gap: '5px',
    maxWidth: '227px',
    zIndex: 1,
}))
const Color = styled(Box)<{ color: string; active: number }>(
    ({ theme, color, active }) => ({
        boxSizing: 'border-box',
        height: '24px',
        width: '24px',
        backgroundColor: color,
        border:
            theme.palette.mode === 'dark'
                ? active
                    ? '2px solid white'
                    : 'none'
                : active
                ? '2px solid black'
                : 'none',
        '&:hover': {
            border: theme.palette.mode === 'dark' ? '2px solid white' : '2px solid black',
        },
    })
)

interface Props {
    active: string
    onChangeComplete: (color: any) => void
}

const StyledPicker: React.FC<Props> = ({ onChangeComplete, active }) => {
    return (
        <ColorsContainer>
            {colors.map((color) => (
                <Color
                    active={color === active ? 1 : 0}
                    onClick={() => onChangeComplete(color)}
                    key={color}
                    color={color}
                ></Color>
            ))}
        </ColorsContainer>
    )
}

export default StyledPicker
