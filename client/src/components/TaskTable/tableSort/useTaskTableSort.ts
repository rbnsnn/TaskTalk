import { useReducer, useState } from 'react'
import { TaskData } from '../../../types/task-data.type'
import { TaskOrder } from '../../../types/task-order.enum'
import { sortByCreated } from './sortByCreated'
import { sortByPriority } from './sortByPriority'
import { sortByStatus } from './sortByStatus'
import { sortByTitle } from './sortByTitle'

interface IAction {
    type: TaskOrder
    dir: 'asc' | 'desc'
}

export interface TaskTableState {
    data: TaskData[]
    order: TaskOrder
    dir: 'asc' | 'desc'
}

const reducer = (state: TaskTableState, action: IAction): any => {
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
}

export const useTaskTableSort = (init: TaskData[]) => {
    const [state, dispatch] = useReducer(reducer, {
        data: init,
        order: TaskOrder.priority,
        dir: 'asc',
    })

    return { state, dispatch }
}
