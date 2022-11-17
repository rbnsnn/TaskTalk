import { Controller, Post, Body } from '@nestjs/common'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('/new')
    createUserByAdmin(@Body() body: CreateTaskDto) {
        return this.tasksService.createTask(body)
    }
}
