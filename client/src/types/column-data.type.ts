import { TaskData } from './task-data.type'

export interface ColumnData {
    columnId: string
    name: string
    color: string
    tasks: TaskData[]
}
