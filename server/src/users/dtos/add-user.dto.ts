import { IsString, MinLength, IsEmail, IsOptional, IsArray } from 'class-validator'

export class AddUserDto {
    @IsString()
    companyId: string

    @IsString()
    companyName: string

    @IsString()
    @IsOptional()
    lfirstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsString()
    @IsOptional()
    phoneNumber: string

    @IsArray()
    roles: string[]

    @IsString()
    @MinLength(4)
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}