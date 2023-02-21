import { Get, Controller, Post, Put, Body, Req, Param } from '@nestjs/common'
import { CreateTaskDto } from './dtos/create-task.dto'
import { TasksService } from './tasks.service'
import { DataSerializer } from '../interceptors/data-serializer.interceptor'
import { TaskSerializeDto } from './dtos/task-serialize.dto'
import { UpdateTaskDto } from './dtos/update-task.dto'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('/new')
    async createUserByAdmin(@Body() body: CreateTaskDto, @Req() req) {
        return await this.tasksService.createTask(body, req.user)
    }

    @DataSerializer(TaskSerializeDto)
    @Get('/id/:taskId')
    async getTaskById(@Param('taskId') taskId, @Req() req) {
        const { companyId } = req.user
        const data = await this.tasksService.findOneTask(companyId, taskId)

        return data
    }

    @Put('/id/:taskId')
    async updateTask(@Param('taskId') taskId, @Req() req, @Body() body: UpdateTaskDto) {
        const { companyId } = req.user
        const data = await this.tasksService.updateOneTaskById(companyId, taskId, body)

        return data
    }
}
