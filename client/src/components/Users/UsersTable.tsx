import React from 'react';
import {
    Paper,
    Table,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
} from '@mui/material';
import UserRow from './UserRow';
import UsersTableTittle from './UsersTableTittle';
import { UserData } from '../../types/user-data.type';

interface Props {
    data: UserData[];
    handleOpen: () => void;
}

const UsersTable: React.FC<Props> = ({ data, handleOpen }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: { xs: '95%', sm: '100%' },
            }}
        >
            <UsersTableTittle handleOpen={handleOpen} />
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell variant='headerMain' />
                        <TableCell variant='headerMain'>Username</TableCell>
                        <TableCell variant='headerMain'>User ID</TableCell>
                        <TableCell variant='headerMain'>Role</TableCell>
                        <TableCell variant='headerMain'>Email</TableCell>
                        <TableCell variant='headerMain'>Tasks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user: UserData) => (
                        <UserRow
                            key={user.username}
                            user={user}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
