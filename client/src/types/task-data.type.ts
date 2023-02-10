import { CompanyUsers } from './company-users.type'
import { StatusI } from './status.type'
import { TaskLabel } from './task-label.type'

export interface TaskData {
    taskId: string
    assignedUsers: CompanyUsers[]
    status: StatusI
    assignedColumn: string
    priority: string
    title: string
    description: string
    labels: TaskLabel[]
    created?: string
}
