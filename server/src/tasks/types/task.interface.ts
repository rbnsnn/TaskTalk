import { StatusI } from './status.type'

export interface TaskInterface {
    taskId: string
    assignedColumn: string
    status: StatusI
}
