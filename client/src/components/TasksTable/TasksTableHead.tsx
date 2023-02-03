import React from 'react'
import { TableHead, TableCell, TableRow, TableSortLabel } from '@mui/material'
import { TaskOrder } from '../../types/task-order.enum'
import { TasksTableState } from '../../hooks/useTasksTableHandler'

interface Action {
    type: TaskOrder
    dir: 'asc' | 'desc'
}
interface Props {
    data: TasksTableState
    dispatch: (action: Action) => void
}

const TasksTableHead: React.FC<Props> = ({ data, dispatch }) => {
    const handleDispatch = (type: TaskOrder) => {
        if (data.order !== type) {
            dispatch({ type, dir: 'asc' })
        } else if (data.dir === 'asc') {
            dispatch({ type, dir: 'desc' })
        } else if (data.dir === 'desc') {
            dispatch({ type, dir: 'asc' })
        } else {
            return
        }
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    width='35%'
                    align='left'
                    sortDirection={data.order === TaskOrder.title ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.title)}
                >
                    <TableSortLabel
                        active={data.order === TaskOrder.title}
                        direction={data.order === TaskOrder.title ? data.dir : 'asc'}
                    >
                        Title
                    </TableSortLabel>
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                >
                    Assigned to
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                    sortDirection={data.order === TaskOrder.priority ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.priority)}
                >
                    <TableSortLabel
                        active={data.order === TaskOrder.priority}
                        direction={data.order === TaskOrder.priority ? data.dir : 'asc'}
                    >
                        Priority
                    </TableSortLabel>
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                    sortDirection={data.order === TaskOrder.status ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.status)}
                >
                    <TableSortLabel
                        active={data.order === TaskOrder.status}
                        direction={data.order === TaskOrder.status ? data.dir : 'asc'}
                    >
                        Status
                    </TableSortLabel>
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                >
                    ID
                </TableCell>
                <TableCell
                    width='13%'
                    align='right'
                    sortDirection={data.order === TaskOrder.created ? 'asc' : false}
                    onClick={() => handleDispatch(TaskOrder.created)}
                >
                    <TableSortLabel
                        active={data.order === TaskOrder.created}
                        direction={data.order === TaskOrder.created ? data.dir : 'asc'}
                    >
                        Created
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TasksTableHead
