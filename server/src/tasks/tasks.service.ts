import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task, TaskDocument } from './schemas/task.schema'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dtos/create-task.dto'
import ShortUniqueId from 'short-unique-id'
import { CompaniesService } from 'src/companies/companies.service'
import { TaskInterface } from './types/task.interface'
import { StatusI } from './types/status.type'

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
        private companiesService: CompaniesService
    ) {}
    async getAllTasks(companyId) {
        const tasks = await this.taskModel.find({ companyId })

        const columns = await this.companiesService.findColumns(companyId)

        const filteredTasks = columns.map((column) => {
            const tasksIds = column.tasks.map((item) => item.taskId)
            const assignedTasks = tasks.filter((task) => tasksIds.includes(task.taskId))
            const sortedTasks = [...assignedTasks].sort(
                (a: any, b: any) =>
                    tasksIds.indexOf(a.taskId) - tasksIds.indexOf(b.taskId)
            )
            return { ...column, tasks: sortedTasks }
        })

        return filteredTasks
    }

    async createTask(createTaskDto: CreateTaskDto, user: any) {
        const taskUid = new ShortUniqueId({ length: 10 })
        const generatedTaskUid = taskUid()

        const newTask = {
            ...createTaskDto,
            taskId: generatedTaskUid,
            created: new Date(),
            createdBy: { userId: user.sub, username: user.username },
            companyId: user.companyId,
        }

        const createdTask = await new this.taskModel(newTask)

        await createdTask.save()

        await this.companiesService.addTask(
            createTaskDto.assignedColumn,
            user.companyId,
            generatedTaskUid
        )
        return true
    }

    async updateTask(
        taskId: string,
        status: StatusI,
        assignedColumn: string
    ): Promise<boolean> {
        try {
            await this.taskModel.findOneAndUpdate({ taskId }, { assignedColumn, status })
            return true
        } catch (err) {
            return err
        }
    }

    async updateMany(
        companyId: string,
        assignedColumn: string,
        status: StatusI
    ): Promise<boolean> {
        try {
            await this.taskModel.updateMany(
                {
                    $and: [{ companyId }, { assignedColumn }],
                },
                {
                    status,
                }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async deleteTasks(companyId: string, assignedColumn: string): Promise<boolean> {
        try {
            await this.taskModel.deleteMany({ $and: [{ companyId }, { assignedColumn }] })
            return true
        } catch (err) {
            return err
        }
    }

    async findOneTask(
        companyId: string,
        taskId: string
    ): Promise<boolean | TaskInterface> {
        try {
            const task = await this.taskModel.findOne({ $and: [{ companyId, taskId }] })

            if (!task) {
                throw new NotFoundException('Task not found')
            }

            return task
        } catch (err) {
            return err
        }
    }

    async deleteOneTask(companyId: string, taskId: string): Promise<boolean> {
        try {
            await this.taskModel.deleteOne({ $and: [{ companyId, taskId }] })
        } catch (err) {
            return err
        }
    }

    async getAllTasksByCompanyId(companyId: string): Promise<boolean | TaskInterface[]> {
        try {
            const tasks = await this.taskModel.find({ companyId })
            if (!tasks) {
                throw new NotFoundException('Tasks not found')
            }
            return tasks
        } catch (err) {
            return err
        }
    }
}
