import { Controller, Get, Post, Request } from '@nestjs/common'
import { Public } from 'src/auth/decorators/public-route.decorator'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Public()
    @Get('/all')
    async getAllTasks(@Request() req) {
        return this.tasksService.getAllTasks(req.company)
    }

    @Public()
    @Post('/new')
    async createTask(@Request() req) {
        return this.tasksService.createTask(req.body, req.user)
    }
}
