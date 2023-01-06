import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from './schemas/company.schema'
import { CompaniesController } from './companies.controler'

@Module({
    imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
    providers: [CompaniesService],
    controllers: [CompaniesController],
    exports: [CompaniesService],
})
export class CompaniesModule {}
