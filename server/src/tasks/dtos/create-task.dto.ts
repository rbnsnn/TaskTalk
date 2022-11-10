import { IsArray, IsString } from 'class-validator'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import { Priority } from '../types/priority.enum'

export class CreateTaskDto {
    @IsString()
    companyId: string

    @IsString()
    createdBy: string

    @IsArray()
    assignedUsers: CompanyUsers[]

    @IsString()
    status: string

    @IsString()
    priority: Priority

    @IsArray()
    labels: string[]
}
