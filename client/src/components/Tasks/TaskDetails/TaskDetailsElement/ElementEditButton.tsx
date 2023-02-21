import React from 'react'
import { Button, styled } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#eee' : '',
}))

interface Props {
    edit: boolean
    handleEditStart: () => void
}

const ElementEditButton: React.FC<Props> = ({ edit, handleEditStart }) => {
    return (
        <StyledButton
            disabled={edit}
            size='small'
            onClick={handleEditStart}
        >
            <EditIcon sx={{ mr: 2 }} />
            Edit
        </StyledButton>
    )
}

export default ElementEditButton
