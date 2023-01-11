import { IsObject, IsString } from 'class-validator'
import { TaskInterface } from '../types/task.interface'

export class ChangeTaskDto {
    @IsString()
    target: string

    @IsObject()
    taskToChange: TaskInterface
}
