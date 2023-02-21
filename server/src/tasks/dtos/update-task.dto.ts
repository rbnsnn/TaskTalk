import { IsArray, IsObject, IsString } from 'class-validator'
import { CompanyUsers } from '../../companies/types/company-users.interface'
import { StatusI } from '../../tasks/types/status.type'
import { CreatedBy } from '../types/created-by-interface'
import { Priority } from '../types/priority.enum'
import { LabelI } from '../types/task-label.type'

export class UpdateTaskDto {
    @IsString()
    taskId: string

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
    labels: LabelI[]

    @IsString()
    created: string

    @IsArray()
    createdBy: CreatedBy[]
}
