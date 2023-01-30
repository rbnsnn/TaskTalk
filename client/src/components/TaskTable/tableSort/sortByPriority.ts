import { TaskData } from '../../../types/task-data.type'

export const sortByPriority = (data: TaskData[]): TaskData[] => {
    const sorted = data.sort((a: TaskData, b: TaskData): number =>
        b.priority.localeCompare(a.priority)
    )

    return sorted
}
