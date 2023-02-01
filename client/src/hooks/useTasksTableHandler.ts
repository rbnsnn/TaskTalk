import { useReducer, useState, useContext, useEffect } from 'react'
import { TaskData } from '../types/task-data.type'
import { TaskOrder } from '../types/task-order.enum'
import { handleSort } from '../components/TasksTable/tableSort/handleSort'
import { SocketContext } from '../helpers/socket/socket-context'
import { TaskEvent } from '../types/task-event-enum.type'
import { ColumnData } from '../types/column-data.type'
import { handleSearch } from '../components/TasksTable/tableSearch/handleSearch'

interface IAction {
    type: TaskOrder | 'change' | 'search'
    dir?: 'asc' | 'desc'
    data?: TaskData[]
    value?: string
}

export interface TasksTableState {
    data: TaskData[]
    order: TaskOrder
    dir: 'asc' | 'desc'
    filtered: TaskData[]
}

const reducer = (state: TasksTableState, action: IAction): any => {
    if (action.type === TaskOrder.priority && action.dir === 'asc') {
        const sorted = handleSort(state.data, action.type)
        return {
            data: [...sorted],
            order: action.type,
            dir: 'asc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.priority && action.dir === 'desc') {
        const sorted = handleSort(state.data, action.type).reverse()
        return {
            data: [...sorted],
            order: action.type,
            dir: 'desc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.status && action.dir === 'asc') {
        const sorted = handleSort(state.data, action.type)
        return {
            data: [...sorted],
            order: action.type,
            dir: 'asc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.status && action.dir === 'desc') {
        const sorted = handleSort(state.data, action.type).reverse()
        return {
            data: [...sorted],
            order: action.type,
            dir: 'desc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.created && action.dir === 'asc') {
        const sorted = handleSort(state.data, action.type)
        return {
            data: [...sorted],
            order: action.type,
            dir: 'asc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.created && action.dir === 'desc') {
        const sorted = handleSort(state.data, action.type).reverse()
        return {
            data: [...sorted],
            order: action.type,
            dir: 'desc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.title && action.dir === 'asc') {
        const sorted = handleSort(state.data, action.type)
        return {
            data: [...sorted],
            order: action.type,
            dir: 'asc',
            filtered: state.filtered,
        }
    }
    if (action.type === TaskOrder.title && action.dir === 'desc') {
        const sorted = handleSort(state.data, action.type).reverse()
        return {
            data: [...sorted],
            order: action.type,
            dir: 'desc',
            filtered: state.filtered,
        }
    }
    if (action.type === 'change') {
        const sorted = handleSort(action.data!, state.order)
        return {
            data: [...sorted!],
            order: state.order,
            dir: state.dir,
            filtered: state.filtered,
        }
    }
    if (action.type === 'search') {
        const filtered = handleSearch(state.data, action.value!)

        return { data: state.data, order: state.order, dir: state.dir, filtered }
    }
}

export const useTasksTableHandler = () => {
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        order: TaskOrder.title,
        dir: 'asc',
        filtered: [],
    })
    const socket: any = useContext(SocketContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        socket.emit(TaskEvent.GetTasks)
        setLoading(true)
        const dataHandle = async (socketData: any) => {
            const tasksData: TaskData[] = await socketData
                .map((column: ColumnData) => column.tasks)
                .flat()
            dispatch({ type: 'change', data: tasksData })
            setLoading(false)
        }
        socket.on(TaskEvent.SetTasks, dataHandle)
        return () => {
            socket.off(TaskEvent.SetTasks)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { state, loading, dispatch }
}
