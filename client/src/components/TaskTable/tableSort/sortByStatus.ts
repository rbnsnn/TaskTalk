import { TaskData } from '../../../types/task-data.type'

export const sortByStatus = (data: TaskData[]): TaskData[] => {
    const sorted = data.sort((a: TaskData, b: TaskData): number => {
        if (a.status > b.status) {
            return 1
        }
        if (a.status < b.status) {
            return -1
        }
        if (a.status === b.status) {
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
