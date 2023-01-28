import { Get, Controller, Post, Body, Req, Param } from '@nestjs/common'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('/new')
    async createUserByAdmin(@Body() body: CreateTaskDto, @Req() req) {
        return this.tasksService.createTask(body, req.user)
    }

    @Get('/id/:taskId')
    async getTaskById(@Param('taskId') taskId, @Req() req) {
        const { companyId } = req.user
        return this.tasksService.findOneTask(companyId, taskId)
    }

    @Get('/all')
    async getAllTasks(@Req() req) {
        const { companyId } = req.user
        return this.tasksService.getAllTasksByCompanyId(companyId)
    }
}
