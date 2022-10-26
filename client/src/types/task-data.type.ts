import { CompanyUsers } from './company-users.type'

export interface TaskData {
    taskId: string
    companyId: string
    createdBy: string
    created: Date
    status: string
    assignedUsers: CompanyUsers[]
}
