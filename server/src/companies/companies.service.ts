import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ColumnInterface } from 'src/tasks/types/column.interface'
import { TaskColumn } from 'src/tasks/types/task-column'
import { CreateCompanyDto } from './dtos/create-company.dto'
import { Company, CompanyDocument } from './schemas/company.schema'
import ShortUniqueId from 'short-unique-id'

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

    async addColumn(companyId: string): Promise<boolean> {
        const columnUid = new ShortUniqueId({ length: 4 })
        const generatedColumnId = columnUid()

        const newColumn: TaskColumn = {
            columnId: generatedColumnId,
            name: 'undefined',
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
}
