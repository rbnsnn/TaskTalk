import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ColumnInterface } from 'src/tasks/types/column.interface'
import { TaskColumn } from 'src/tasks/types/task-column'
import { CreateCompanyDto } from './dtos/create-company.dto'
import { Company, CompanyDocument } from './schemas/company.schema'
import ShortUniqueId from 'short-unique-id'
import { TaskInterface } from 'src/tasks/types/task.interface'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
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
        const company = await this.companyModel.find({ companyName }).lean()
        return company
    }

    async findOneAndUpdate(companyName: string, payload: object): Promise<boolean> {
        await this.companyModel.findOneAndUpdate({ companyName }, payload)

        return true
    }

    async addColumn(companyId: string, columnName: string): Promise<boolean> {
        const columnUid = new ShortUniqueId({ length: 4 })
        const generatedColumnId = columnUid()

        const newColumn: TaskColumn = {
            columnId: generatedColumnId,
            name: columnName,
            color: '',
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
        const column = await this.companyModel.findOne({
            $and: [{ companyId }, { taskColumns: { $elemMatch: { name: columnName } } }],
        })

        return column ? true : false
    }

    async findOneColumnAndUpdate(
        companyId: string,
        columnName: string,
        columnId: string
    ): Promise<boolean> {
        try {
            await this.companyModel.findOneAndUpdate(
                {
                    companyId,
                    'taskColumns.columnId': columnId,
                },
                { 'taskColumns.$.name': columnName }
            )
            return true
        } catch (err) {
            return err
        }
    }

    async findColumns(companyId: string): Promise<ColumnInterface[]> {
        const columns = await this.companyModel.findOne({ companyId }).lean()

        return columns.taskColumns ? columns.taskColumns : []
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

    async changeTaskInColumns(
        target: string,
        item: TaskInterface,
        companyId: string
    ): Promise<boolean> {
        try {
            await this.removeTask(item.assignedColumn, companyId, item.taskId)
            await this.addTask(target, companyId, item.taskId)

            return true
        } catch (err) {
            return err
        }
    }
}
