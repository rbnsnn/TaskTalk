import React from 'react'
import { Button, styled } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#eee' : '',
}))

interface Props {
    value: string
}

const ElementCopyButton: React.FC<Props> = ({ value }) => {
    return (
        <StyledButton
            size='small'
            onClick={() => {
                navigator.clipboard.writeText(value)
            }}
        >
            <ContentCopyIcon sx={{ mr: 2 }} />
            Copy
        </StyledButton>
    )
}

export default ElementCopyButton
