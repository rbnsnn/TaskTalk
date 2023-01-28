import { CompanyUsers } from './company-users.type'
import { TaskLabel } from './task-label.type'

export interface TaskData {
    taskId: string
    assignedUsers: CompanyUsers[]
    status: string
    assignedColumn: string
    priority: string
    title: string
    description: string
    labels: TaskLabel[]
    created?: string
}
