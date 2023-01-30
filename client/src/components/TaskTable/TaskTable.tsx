import React from 'react'

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { TaskData } from '../../types/task-data.type'
import TaskTableTitle from './TaskTableTItle'
import TaskTableRow from './TaskTableRow'

interface Props {
    data: TaskData[]
}

const TaskTable: React.FC<Props> = ({ data }) => {
    const handleOpen = () => ''
    return (
        <Paper sx={{ width: { md: '70%' }, margin: '0 auto' }}>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: { xs: '95%', sm: '100%' },
                }}
            >
                <TaskTableTitle handleOpen={handleOpen} />
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align='right'>Assigned to</TableCell>
                            <TableCell align='right'>Priority</TableCell>
                            <TableCell align='right'>Status</TableCell>
                            <TableCell align='right'>ID</TableCell>
                            <TableCell align='right'>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((task: TaskData) => (
                            <TaskTableRow
                                key={task.taskId}
                                task={task}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TaskTable
