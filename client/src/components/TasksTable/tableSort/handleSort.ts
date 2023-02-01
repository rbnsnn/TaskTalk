import { TaskData } from '../../../types/task-data.type'
import { TaskOrder } from '../../../types/task-order.enum'
import { sortByCreated } from './sortByCreated'
import { sortByPriority } from './sortByPriority'
import { sortByStatus } from './sortByStatus'
import { sortByTitle } from './sortByTitle'

export const handleSort = (
    data: TaskData[],
    sortBy: TaskOrder | 'change' | 'search'
): TaskData[] => {
    if (sortBy === TaskOrder.priority) {
        return sortByPriority(data)
    }

    if (sortBy === TaskOrder.status) {
        return sortByStatus(data)
    }

    if (sortBy === TaskOrder.created) {
        return sortByCreated(data)
    }

    if (sortBy === TaskOrder.title) {
        return sortByTitle(data)
    } else {
        return []
    }
}
