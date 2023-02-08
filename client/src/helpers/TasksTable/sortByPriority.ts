import { TaskData } from '../../../types/task-data.type'

const priorityValue: any = {
    high: 100,
    medium: 75,
    low: 50,
    undefined: 0,
}

export const sortByPriority = (data: TaskData[]): TaskData[] => {
    const sorted = data.sort((a: TaskData, b: TaskData): number => {
        if (priorityValue[a.priority] > priorityValue[b.priority]) {
            return 1
        }
        if (priorityValue[a.priority] < priorityValue[b.priority]) {
            return -1
        }
        if (priorityValue[a.priority] === priorityValue[b.priority]) {
            if (a.title > b.title) {
                return 1
            }
            if (a.title < b.title) {
                return -1
            }
            return 0
        }
        return 0
    })
    return sorted
}
