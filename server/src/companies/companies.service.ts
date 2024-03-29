import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ColumnInterface } from 'src/tasks/types/column.interface'
import { TaskColumn } from 'src/tasks/types/task-column'
import { CreateCompanyDto } from './dtos/create-company.dto'
import { Company, CompanyDocument } from './schemas/company.schema'
import { LabelI } from 'src/tasks/types/task-label.type'
import { TasksService } from 'src/tasks/tasks.service'
import ShortUniqueId from 'short-unique-id'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
        @Inject(forwardRef(() => TasksService))
        private tasksService: TasksService
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<any> {
        const createdCompany = await new this.companyModel(createCompanyDto)

        try {
            createdCompany.save()
            return true
        } catch (err) {
            return false
        }
    }

    async findOne(companyName: string): Promise<Company[]> {
        const company = await this.companyModel
            .find({ companyName })
            .collation({ locale: 'en', strength: 1 })
            .lean()
        return company
    }

    async findOneAndUpdate(companyName: string, payload: object): Promise<boolean> {
        await this.companyModel.findOneAndUpdate({ companyName }, payload)

        return true
    }

    async findOneAndUpdateById(companyId: string, payload: object): Promise<boolean> {
        await this.companyModel.findOneAndUpdate({ companyId }, payload)

        return true
    }

    async addColumn(companyId: string, columnName: string, color = ''): Promise<boolean> {
        const columnUid = new ShortUniqueId({ length: 4 })
        const generatedColumnId = columnUid()

        const newColumn: TaskColumn = {
            columnId: generatedColumnId,
            name: columnName,
            color,
            tasks: [],
        }

        try {
            await this.companyModel.findOneAndUpdate(
                { companyId },
                { $push: { taskColumns: newColumn } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async deleteColumn(companyId: string, columnId: string): Promise<boolean> {
        try {
            await this.companyModel.findOneAndUpdate(
                { companyId },
                { $pull: { taskColumns: { columnId } } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async findOneColumn(companyId: string, columnName: string): Promise<boolean> {
        const column = await this.companyModel
            .findOne({
                $and: [
                    { companyId },
                    { taskColumns: { $elemMatch: { name: columnName } } },
                ],
            })
            .collation({ locale: 'en', strength: 1 })

        return column ? true : false
    }

    async findOneColumnAndUpdate(
        companyId: string,
        payload: any,
        columnId: string
    ): Promise<boolean> {
        try {
            const prop = Object.keys(payload)[0]
            const value = payload[prop]

            await this.companyModel.findOneAndUpdate(
                {
                    companyId,
                    'taskColumns.columnId': columnId,
                },
                { [`taskColumns.$.${prop}`]: value }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async findColumns(companyId: string): Promise<ColumnInterface[]> {
        try {
            const columns = await this.companyModel.findOne({ companyId }).lean()
            return columns.taskColumns ? columns.taskColumns : []
        } catch (err) {
            return err
        }
    }

    async deleteUserFromCompany(userId: string): Promise<boolean> {
        await this.companyModel.findOneAndUpdate(
            { users: { userId } },
            { $pull: { users: { userId } } }
        )
        return true
    }

    async addTask(columnId: string, companyId: string, taskId: string): Promise<boolean> {
        try {
            await this.companyModel.findOneAndUpdate(
                {
                    companyId,
                    'taskColumns.columnId': columnId,
                },
                { $push: { 'taskColumns.$.tasks': { taskId } } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async removeTask(
        columnId: string,
        companyId: string,
        taskId: string
    ): Promise<boolean> {
        try {
            await this.companyModel.findOneAndUpdate(
                {
                    companyId,
                    'taskColumns.columnId': columnId,
                },
                { $pull: { 'taskColumns.$.tasks': { taskId } } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async changeTaskInColumns(newColumns: any, companyId: string): Promise<boolean> {
        try {
            await this.findOneAndUpdateById(companyId, { taskColumns: newColumns })

            return true
        } catch (err) {
            return err
        }
    }

    async findLabels(companyId: string): Promise<LabelI[]> {
        try {
            const company = await this.companyModel.findOne({ companyId }).lean()
            return company.labels ? company.labels : []
        } catch (err) {
            return err
        }
    }

    async findOneLabel(companyId: string, label: string): Promise<boolean> {
        const labelExists = await this.companyModel
            .findOne({
                $and: [{ companyId }, { labels: { $elemMatch: { label: label } } }],
            })
            .collation({ locale: 'en', strength: 1 })

        return labelExists ? true : false
    }

    async addLabel(companyId: string, label: LabelI): Promise<boolean> {
        try {
            await this.companyModel.findOneAndUpdate(
                { companyId },
                { $push: { labels: label } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async deleteLabel(companyId: string, label: string): Promise<boolean> {
        try {
            await this.tasksService.deleteLabelFromTasks(companyId, label)
            await this.companyModel.findOneAndUpdate(
                { companyId },
                { $pull: { labels: { label } } }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async updateLabel(
        companyId: string,
        label: string,
        payload: LabelI
    ): Promise<boolean> {
        try {
            await this.tasksService.updateLabelInTasks(companyId, label, payload)
            await this.companyModel.findOneAndUpdate(
                {
                    companyId,
                    'labels.label': label,
                },
                {
                    [`labels.$`]: { ...payload },
                }
            )
            return true
        } catch (err) {
            return err
        }
    }
}
