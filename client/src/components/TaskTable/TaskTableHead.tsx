import React from 'react'
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material'
import { TaskOrder } from '../../types/task-order'
import { TaskTableState } from './tableSort/useTaskTableSort'
import { Task } from '@mui/icons-material'

interface Action {
    type: TaskOrder
    dir: 'asc' | 'desc'
}
interface Props {
    state: TaskTableState
    dispatch: (action: Action) => void
}

const TaskTableHead: React.FC<Props> = ({ state, dispatch }) => {
    const handleDispatch = (type: TaskOrder) => {
        if (state.order !== type) {
            dispatch({ type, dir: 'asc' })
        } else if (state.dir === 'asc') {
            dispatch({ type, dir: 'desc' })
        } else if (state.dir === 'desc') {
            dispatch({ type, dir: 'asc' })
        } else {
            return
        }
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align='right'>Assigned to</TableCell>
                <TableCell
                    align='right'
                    sortDirection={state.order === TaskOrder.priority ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.priority)}
                >
                    <TableSortLabel
                        active={state.order === TaskOrder.priority}
                        direction={state.order === TaskOrder.priority ? state.dir : 'asc'}
                    >
                        Priority
                    </TableSortLabel>
                </TableCell>
                <TableCell
                    align='right'
                    sortDirection={state.order === TaskOrder.status ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.status)}
                >
                    <TableSortLabel
                        active={state.order === TaskOrder.status}
                        direction={state.order === TaskOrder.status ? state.dir : 'asc'}
                    >
                        Status
                    </TableSortLabel>
                </TableCell>
                <TableCell align='right'>ID</TableCell>
                <TableCell
                    align='right'
                    sortDirection={state.order === TaskOrder.created ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.created)}
                >
                    <TableSortLabel
                        active={state.order === TaskOrder.created}
                        direction={state.order === TaskOrder.created ? state.dir : 'asc'}
                    >
                        Created
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TaskTableHead
