import { Expose } from 'class-transformer'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import { CreatedBy } from '../types/created-by-interface'
import { LabelI } from '../types/task-label.type'

export class TaskSerializeDto {
    @Expose()
    assignedColumn: string

    @Expose()
    assignedUsers: CompanyUsers[] | null

    @Expose()
    created: Date

    @Expose()
    createdBy: CreatedBy[]

    @Expose()
    description: string

    @Expose()
    labels: LabelI[] | null

    @Expose()
    priority: string

    @Expose()
    status: string

    @Expose()
    taskId: string

    @Expose()
    title: string
}
