import React, { useState } from 'react'
import {
    Paper,
    Table,
    TableRow,
    TableBody,
    TableContainer,
    Box,
    Slide,
} from '@mui/material'
import { TaskData } from '../../../types/task-data.type'
import { TasksTableState } from '../../../hooks/useTasksTableHandler'
import TasksTableRow from './TasksTableRow'
import TasksTableHead from './TasksTableHead'
import TasksTableTitle from './TasksTableTItle'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'

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
        <TableRow>
            <TableCell colSpan={6}>
                <Typography textAlign='center'>No tasks matching...</Typography>
            </TableCell>
        </TableRow>
    )

    const tasksData = state.data.map((task: TaskData) => (
        <TasksTableRow
            key={task.taskId}
            task={task}
        />
    ))

    return (
        <Slide
            direction='down'
            in={true}
        >
            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <TasksTableTitle
                    handleOpen={handleOpen}
                    dispatch={dispatch}
                    setSearchValue={setSearchValue}
                />
                <TableContainer
                    component={Paper}
                    sx={{
                        margin: '0 auto',
                        maxHeight: '75vh',
                        maxWidth: { xs: '95%', sm: '100%', xl: '85%' },
                    }}
                >
                    <Table
                        stickyHeader
                        sx={{ minWidth: 700 }}
                    >
                        <TasksTableHead
                            data={state}
                            dispatch={dispatch}
                        />

                        <TableBody>
                            {searchValue ? filteredTasksData : tasksData}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Slide>
    )
}

export default TasksTable
