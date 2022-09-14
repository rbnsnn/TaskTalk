import { IsString, MinLength, IsDefined, IsEmail } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsDefined()
    @MinLength(3, { message: 'Company must be longer than 2 characters' })
    companyName: string

    @IsString()
    @MinLength(4)
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}