import React from 'react'
import { Popper, Fade, Box, Card } from '@mui/material'
import { CustomPicker, TwitterPicker } from 'react-color'
import { getTextContrast } from '../../../../../helpers/getTextContrast'

interface ColumnColorI {
    background: string
    contrast: string
}

interface Props {
    columnColor: ColumnColorI
    setColumnColor: any
    open: boolean
    id: string
    anchorEl: any
}

const ColorPicker: React.FC<Props> = ({
    columnColor,
    setColumnColor,
    open,
    id,
    anchorEl,
}) => {
    const handleChangeColor = (color: any) => {
        const contrast = getTextContrast(color.hex)
        setColumnColor({ background: color.hex, contrast })
    }
    console.log(anchorEl)
    return (
        <Popper
            transition
            id={id}
            className='popper'
            open={open}
            anchorEl={anchorEl}
            placement='bottom'
            disablePortal={false}
            sx={{ zIndex: 2000 }}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [100, 11],
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={400}
                >
                    <Box>
                        <TwitterPicker
                            color={columnColor.background}
                            onChangeComplete={handleChangeColor}
                        />
                    </Box>
                </Fade>
            )}
        </Popper>
    )
}

export default CustomPicker(ColorPicker)
