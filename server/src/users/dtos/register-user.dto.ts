import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator'

export class RegisterUserDto {
    @IsString()
    @MaxLength(30)
    @MinLength(3, { message: 'Company must be longer than 2 characters' })
    companyName: string

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    username: string

    @IsString()
    @IsEmail()
    @MaxLength(30)
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string

    @IsString()
    colorMode: 'light' | 'dark' | ''
}
