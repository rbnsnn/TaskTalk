import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task, TaskDocument } from './schemas/task.schema'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dtos/create-task.dto'
import ShortUniqueId from 'short-unique-id'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
    async getAllTasks(company: string) {
        const tasks = await this.taskModel.find({})
        return 'test'
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: any = { userId: 'user', companyId: 'company' }
    ) {
        const taskUid = new ShortUniqueId({ length: 10 })
        const generatedTaskUid = taskUid()

        const newTask = {
            ...createTaskDto,
            taskId: generatedTaskUid,
            created: new Date(),
            createdBy: user.userId,
            companyId: user.companyId,
            assignedColumn: 'first',
        }

        const createdTask = await new this.taskModel(newTask)

        createdTask.save()
        return true
    }
}
