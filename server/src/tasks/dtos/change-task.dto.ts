import { IsArray, IsObject, IsOptional } from 'class-validator'
import { TaskInterface } from '../types/task.interface'
import { ColumnInterface } from '../types/column.interface'

export class ChangeTaskDto {
    @IsArray()
    newColumns: ColumnInterface[]

    @IsOptional()
    @IsObject()
    taskToChange: TaskInterface
}
