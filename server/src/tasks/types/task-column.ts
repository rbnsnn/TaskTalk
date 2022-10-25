import { TaskInterface } from './task.interface'

export interface TaskColumn {
    id: string
    name: string
    tasks: TaskInterface[]
}
