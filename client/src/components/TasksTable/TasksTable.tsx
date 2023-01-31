import React from 'react'
import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { TaskData } from '../../types/task-data.type'
import TasksTableTitle from './TasksTableTItle'
import TasksTableRow from './TasksTableRow'
import TasksTableHead from './TasksTableHead'
import { TasksTableState } from '../../hooks/useTasksTableHandler'

interface Props {
    state: TasksTableState
    dispatch: any
}

const TasksTable: React.FC<Props> = ({ state, dispatch }) => {
    const handleOpen = () => ''

    return (
        <Paper sx={{ width: { md: '70%' }, margin: '0 auto' }}>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: { xs: '95%', sm: '100%' },
                }}
            >
                <TasksTableTitle handleOpen={handleOpen} />
                <Table stickyHeader>
                    <TasksTableHead
                        data={state}
                        dispatch={dispatch}
                    />
                    <TableBody>
                        {state.data.map((task: TaskData) => (
                            <TasksTableRow
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

export default TasksTable
