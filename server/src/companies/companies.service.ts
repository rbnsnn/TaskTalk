import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }

    async create(createCompanyDto: CreateCompanyDto): Promise<any> {
        const createdCompany = await new this.companyModel(createCompanyDto)

        createdCompany.save()
        return true
    }

    async findOne(companyName: string): Promise<Company[]> {
        const company = await this.companyModel.find({ companyName }).lean()
        return company
    }
}