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

const ColorsContainer = styled(Box)(({ theme }) => ({
    width: '500px',
    display: 'flex',
    flexWrap: 'wrap',
    flex: `0 0 50%`,
    gap: '5px',
}))
const Color = styled(Box)<{ color: string }>(({ theme, color }) => ({
    height: '24px',
    width: '24px',
    backgroundColor: color,
}))

const StyledPicker: React.FC = () => {
    return (
        <ColorsContainer>
            {colors.map((color) => (
                <Color
                    key={color}
                    color={color}
                ></Color>
            ))}
        </ColorsContainer>
    )
}

export default StyledPicker
