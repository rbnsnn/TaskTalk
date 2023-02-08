import {
    IsString,
    MinLength,
    IsEmail,
    IsOptional,
    IsArray,
    MaxLength,
} from 'class-validator'
import { Role } from 'src/roles/enums/role.enum'

export class AddUserDto {
    @IsString()
    companyId: string

    @IsString()
    companyName: string

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsString()
    @IsOptional()
    phoneNumber: string

    @IsArray()
    roles: Role[]

    @IsString()
    @MinLength(4)
    @MaxLength(14)
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}
