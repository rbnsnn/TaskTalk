import { IsArray, IsObject, IsString } from 'class-validator'
import { CompanyUsers } from '../../companies/types/company-users.interface'
import { StatusI } from '../../tasks/types/status.type'
import { Priority } from '../types/priority.enum'
import { TaskLabel } from '../types/task-label.type'

export class CreateTaskDto {
    @IsArray()
    assignedUsers: CompanyUsers[]

    @IsObject()
    status: StatusI

    @IsString()
    assignedColumn: string

    @IsString()
    priority: Priority

    @IsString()
    title: string

    @IsString()
    description: string

    @IsArray()
    labels: TaskLabel[]
}
