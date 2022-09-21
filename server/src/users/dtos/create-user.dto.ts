import { IsString, MinLength, IsEmail } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Company must be longer than 2 characters' })
    companyName: string

    @IsString()
    @MinLength(4)
    username: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}