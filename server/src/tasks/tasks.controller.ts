import { Controller, Get, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    async getAllTasks(@Request() req) {
        return this.tasksService.getAllTasks(req.company)
    }
}
