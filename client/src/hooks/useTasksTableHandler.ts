import { useReducer, useState, useContext, useEffect } from 'react'
import { TaskData } from '../types/task-data.type'
import { TaskOrder } from '../types/task-order.enum'
import { sortByCreated } from '../components/TasksTable/tableSort/sortByCreated'
import { sortByPriority } from '../components/TasksTable/tableSort/sortByPriority'
import { sortByStatus } from '../components/TasksTable/tableSort/sortByStatus'
import { sortByTitle } from '../components/TasksTable/tableSort/sortByTitle'
import { SocketContext } from '../helpers/socket/socket-context'
import { TaskEvent } from '../types/task-event-enum.type'
import { ColumnData } from '../types/column-data.type'

interface IAction {
    type: TaskOrder | 'change'
    dir?: 'asc' | 'desc'
    data?: TaskData[]
}

export interface TasksTableState {
    data: TaskData[]
    order: TaskOrder
    dir: 'asc' | 'desc'
}

const handleChangeSort = (data: TaskData[], sortBy: TaskOrder, dir: 'asc' | 'desc') => {
    if (sortBy === TaskOrder.priority && dir === 'asc') {
        return sortByPriority(data)
    }
    if (sortBy === TaskOrder.priority && dir === 'desc') {
        return sortByPriority(data)
    }
    if (sortBy === TaskOrder.status && dir === 'asc') {
        return sortByStatus(data)
    }
    if (sortBy === TaskOrder.status && dir === 'desc') {
        return sortByStatus(data)
    }
    if (sortBy === TaskOrder.created && dir === 'asc') {
        return sortByCreated(data)
    }
    if (sortBy === TaskOrder.created && dir === 'desc') {
        return sortByCreated(data)
    }
    if (sortBy === TaskOrder.title && dir === 'asc') {
        return sortByTitle(data)
    }
    if (sortBy === TaskOrder.title && dir === 'desc') {
        return sortByTitle(data)
    }
}

const reducer = (state: TasksTableState, action: IAction): any => {
    if (action.type === TaskOrder.priority && action.dir === 'asc') {
        const sorted = sortByPriority(state.data)
        return { data: [...sorted], order: action.type, dir: 'asc' }
    }
    if (action.type === TaskOrder.priority && action.dir === 'desc') {
        const sorted = sortByPriority(state.data).reverse()
        return { data: [...sorted], order: action.type, dir: 'desc' }
    }
    if (action.type === TaskOrder.status && action.dir === 'asc') {
        const sorted = sortByStatus(state.data)
        return { data: [...sorted], order: action.type, dir: 'asc' }
    }
    if (action.type === TaskOrder.status && action.dir === 'desc') {
        const sorted = sortByStatus(state.data).reverse()
        return { data: [...sorted], order: action.type, dir: 'desc' }
    }
    if (action.type === TaskOrder.created && action.dir === 'asc') {
        const sorted = sortByCreated(state.data)
        return { data: [...sorted], order: action.type, dir: 'asc' }
    }
    if (action.type === TaskOrder.created && action.dir === 'desc') {
        const sorted = sortByCreated(state.data).reverse()
        return { data: [...sorted], order: action.type, dir: 'desc' }
    }
    if (action.type === TaskOrder.title && action.dir === 'asc') {
        const sorted = sortByTitle(state.data)
        return { data: [...sorted], order: action.type, dir: 'asc' }
    }
    if (action.type === TaskOrder.title && action.dir === 'desc') {
        const sorted = sortByTitle(state.data).reverse()
        return { data: [...sorted], order: action.type, dir: 'desc' }
    }
    if (action.type === 'change') {
        const sorted = handleChangeSort(action.data!, state.order, state.dir)
        return { data: [...sorted!], order: state.order, dir: state.dir }
    }
}

export const useTasksTableHandler = () => {
    const [state, dispatch] = useReducer(reducer, {
        data: {},
        order: TaskOrder.title,
        dir: 'asc',
    })
    const socket: any = useContext(SocketContext)
    // const [data, setData] = useState<TaskData[]>([])
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
