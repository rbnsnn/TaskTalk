import { TaskInterface } from './task.interface'

export interface ColumnInterface {
    columnId: string
    name: string
    color?: string
    tasks: TaskInterface[]
}
