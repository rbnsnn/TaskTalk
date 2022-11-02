import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'

interface Props {
    children: ReactNode
    to: string
    onClick?: () => void
}

const TextLink: React.FC<Props> = ({ children, to, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
        >
            <MuiLink
                component='button'
                variant='body2'
            >
                {children}
            </MuiLink>
        </Link>
    )
}

export default TextLink
