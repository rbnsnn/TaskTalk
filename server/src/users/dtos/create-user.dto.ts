import { IsString, MinLength, IsDefined } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsDefined()
    @MinLength(3, { message: 'Company must be longer than 2 characters' })
    companyName: string

    @IsString()
    @MinLength(4)
    username: string

    @IsString()
    password: string
}