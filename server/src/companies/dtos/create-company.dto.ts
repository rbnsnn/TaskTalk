import { IsArray, IsString } from 'class-validator'

export class CreateCompanyDto {
    @IsString()
    companyId: string

    @IsString()
    companyName: string

    @IsArray()
    users: string[]
}