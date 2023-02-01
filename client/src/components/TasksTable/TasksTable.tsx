import React, { useState } from 'react'
import { Paper, Table, TableRow, TableBody, TableContainer } from '@mui/material'
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

    const [searchValue, setSearchValue] = useState<string>('')

    const filteredTasksData = state.filtered.length ? (
        state.filtered.map((task: TaskData) => (
            <TasksTableRow
                key={task.taskId}
                task={task}
            />
        ))
    ) : (
        <TableRow>No tasks matching...</TableRow>
    )

    const tasksData = state.data.map((task: TaskData) => (
        <TasksTableRow
            key={task.taskId}
            task={task}
        />
    ))

    return (
        <TableContainer
            component={Paper}
            sx={{
                margin: '0 auto',
                maxWidth: { xs: '95%', sm: '100%', xl: '85%' },
            }}
        >
            <TasksTableTitle
                handleOpen={handleOpen}
                dispatch={dispatch}
                setSearchValue={setSearchValue}
            />
            <Table
                stickyHeader
                sx={{ minWidth: 700 }}
            >
                <TasksTableHead
                    data={state}
                    dispatch={dispatch}
                />
                <TableBody>
                    {searchValue.length ? filteredTasksData : tasksData}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TasksTable
