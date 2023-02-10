import { IsString } from 'class-validator'

export class ColorChangeDto {
    @IsString()
    columnId: string

    @IsString()
    color: string

    @IsString()
    name: string
}
