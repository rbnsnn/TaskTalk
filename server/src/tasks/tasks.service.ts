import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task, TaskDocument } from './schemas/task.schema'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dtos/create-task.dto'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
    async getAllTasks(company: string) {
        const tasks = await this.taskModel.find({})
        return 'test'
    }

    async createTask(createTaskDto: CreateTaskDto, user: any) {
        const createdTask = await new this.taskModel(createTaskDto)

        createdTask.save()
        return true
    }
}
