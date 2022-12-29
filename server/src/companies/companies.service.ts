import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ColumnInterface } from 'src/tasks/types/column.interface'
import { CreateCompanyDto } from './dtos/create-company.dto'
import { Company, CompanyDocument } from './schemas/company.schema'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<any> {
        const createdCompany = await new this.companyModel(createCompanyDto)

        createdCompany.save()
        return true
    }

    async findOne(companyName: string): Promise<Company[]> {
        const company = await this.companyModel.find({ companyName }).lean()
        return company
    }

    async findOneAndUpdate(companyName: string, payload: object): Promise<boolean> {
        console.log(companyName, payload)
        await this.companyModel.findOneAndUpdate({ companyName }, payload)

        return true
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
