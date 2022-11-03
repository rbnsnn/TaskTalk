import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Link as MuiLink, Typography } from '@mui/material'

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
            style={{ width: '100%' }}
        >
            <MuiLink
                component='button'
                variant='body2'
                underline='none'
                sx={{
                    wordWrap: 'word-break',
                    width: '100%',
                }}
            >
                <Typography
                    sx={{
                        wordWrap: 'word-break',
                        width: '100%',
                    }}
                >
                    {children}
                </Typography>
            </MuiLink>
        </Link>
    )
}

export default TextLink
