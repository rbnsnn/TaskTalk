import { IsString, MinLength, IsDefined } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsDefined()
    companyName: string

    @IsString()
    @MinLength(4)
    username: string

    @IsString()
    password: string
}