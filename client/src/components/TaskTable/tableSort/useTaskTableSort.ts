import { useReducer, useState } from 'react'
import { TaskData } from '../../../types/task-data.type'
import { TaskOrder } from '../../../types/task-order'
import { sortByPriority } from './sortByPriority'

interface IAction {
    type: TaskOrder
}

const reducer = (state: TaskData[], action: IAction): any => {
    if (action.type === 'priority_ascending') {
        return sortByPriority(state)
    }
    if (action.type === 'priority_descending') {
        return sortByPriority(state)
    }
}

export const useTaskTableSort = (init: TaskData[]) => {
    const [state, dispatch] = useReducer(reducer, init)

    return { state, dispatch }
}
