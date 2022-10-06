import React, { useState } from 'react'
import { TableRow, TableCell, Collapse, Box, IconButton, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import UserDetails from './UserDetails'

interface Props {
    user: any
}

const UserRow: React.FC<Props> = ({ user }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <TableRow
                sx={{
                    '& > *': {
                        borderBottom: 'unset',
                    },
                }}
            >
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell
                    component='th'
                    scope='row'
                >
                    {user.username}
                </TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.roles[0]}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.tasks}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={6}
                >
                    <Collapse
                        in={open}
                        timeout='auto'
                        unmountOnExit
                    >
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                Details of {user.username}
                            </Typography>
                            <UserDetails user={user} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserRow
