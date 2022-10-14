import { IsArray, IsString } from 'class-validator'
import { CompanyUsers } from '../types/company-users.interface'

export class CreateCompanyDto {
    @IsString()
    companyId: string

    @IsString()
    companyName: string

    @IsArray()
    users: CompanyUsers[]
}
