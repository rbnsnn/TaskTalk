import { TaskData } from '../../types/task-data.type'

export const sortByStatus = (data: TaskData[]): TaskData[] => {
    const sorted = data.sort((a: TaskData, b: TaskData): number => {
        if (a.status.name > b.status.name) {
            return 1
        }
        if (a.status.name < b.status.name) {
            return -1
        }
        if (a.status.name === b.status.name) {
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
