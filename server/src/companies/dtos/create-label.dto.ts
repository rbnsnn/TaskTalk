import { IsOptional, IsString } from 'class-validator'

export class CreateLabelDto {
    @IsString()
    label: string

    @IsString()
    color: string

    @IsString()
    @IsOptional()
    description: string
}
