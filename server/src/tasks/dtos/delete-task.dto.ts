import { IsString } from 'class-validator'

export class DeleteTaskDto {
    @IsString()
    taskId: string

    @IsString()
    columnId: string
}
