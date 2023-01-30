import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Link as MuiLink, Typography } from '@mui/material'

interface Props {
    children: ReactNode
    to: string
    variant?:
        | 'button'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'inherit'
        | 'body1'
        | 'subtitle1'
        | 'subtitle2'
        | 'body2'
        | 'overline'
        | undefined
    onClick?: () => void
}

const TextLink: React.FC<Props> = ({ children, to, onClick, variant = 'body1' }) => {
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
                    variant={variant}
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
