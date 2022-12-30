import { TaskInterface } from './task.interface'

export interface TaskColumn {
    columnId: string
    name: string
    color?: string
    tasks: TaskInterface[]
}
