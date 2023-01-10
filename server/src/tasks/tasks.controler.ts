import { Controller, Post, Body, Req } from '@nestjs/common'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('/new')
    createUserByAdmin(@Body() body: CreateTaskDto, @Req() req) {
        return this.tasksService.createTask(body, req.user)
    }
}
