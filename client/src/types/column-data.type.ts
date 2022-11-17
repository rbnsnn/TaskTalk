import { TaskData } from './task-data.type'

export interface ColumnData {
    id: string
    name: string
    color: string
    tasks: TaskData[]
}
