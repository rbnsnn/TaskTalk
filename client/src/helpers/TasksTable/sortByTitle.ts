import { TaskData } from '../../types/task-data.type'

export const sortByTitle = (data: TaskData[]): TaskData[] => {
    const sorted = data.sort((a: TaskData, b: TaskData): number => {
        if (a.title! > b.title!) {
            return 1
        }
        if (a.title! < b.title!) {
            return -1
        }
        if (a.title! === b.title!) {
            if (a.created! > b.created!) {
                return 1
            }
            if (a.created! < b.created!) {
                return -1
            }
            return 0
        }
        return 0
    })
    return sorted
}
