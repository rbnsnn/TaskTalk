import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task, TaskDocument } from './schemas/task.schema'
import { Model } from 'mongoose'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
    async getAllTasks(company: string) {
        const tasks = await this.taskModel.find({})
        return ''
    }
}
