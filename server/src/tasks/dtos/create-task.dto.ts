import { IsArray, IsString } from 'class-validator'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import { Priority } from '../types/priority.enum'
import { TaskLabel } from '../types/task-label.type'

export class CreateTaskDto {
    @IsString()
    companyId: string

    @IsString()
    createdBy: string

    @IsString()
    created: Date

    @IsArray()
    assignedUsers: CompanyUsers[]

    @IsString()
    status: string

    @IsString()
    priority: Priority

    @IsString()
    title: string

    @IsString()
    description: string

    @IsArray()
    labels: TaskLabel[]
}
