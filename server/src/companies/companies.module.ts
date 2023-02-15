import { Module, forwardRef } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from './schemas/company.schema'
import { CompaniesController } from './companies.controler'
import { TasksModule } from 'src/tasks/tasks.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        forwardRef(() => TasksModule),
    ],
    providers: [CompaniesService],
    controllers: [CompaniesController],
    exports: [CompaniesService],
})
export class CompaniesModule {}
