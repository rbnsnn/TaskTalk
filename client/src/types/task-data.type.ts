import { CompanyUsers } from './company-users.type'
import { TaskLabel } from './task-label.type'

export interface TaskData {
    companyId: string
    createdBy: string
    created: Date
    assignedUsers: CompanyUsers[]
    status: string
    priority: string
    title: string
    description: string
    labels: TaskLabel[]
}
