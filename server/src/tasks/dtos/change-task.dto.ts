import { IsArray, IsObject } from 'class-validator'
import { TaskInterface } from '../types/task.interface'

export class ChangeTaskDto {
    @IsArray()
    newColumns: any[]

    @IsObject()
    taskToChange: TaskInterface
}
