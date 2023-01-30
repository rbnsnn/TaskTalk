import React from 'react'
import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { TaskData } from '../../types/task-data.type'
import TaskTableTitle from './TaskTableTItle'
import TaskTableRow from './TaskTableRow'
import TaskTableHead from './TaskTableHead'
import { TaskTableState } from './tableSort/useTaskTableSort'

interface Props {
    data: TaskTableState
    dispatch: any
}

const TaskTable: React.FC<Props> = ({ data, dispatch }) => {
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
                    <TaskTableHead
                        data={data}
                        dispatch={dispatch}
                    />
                    <TableBody>
                        {data.data.map((task: TaskData) => (
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
