import { Module, forwardRef } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from './schemas/company.schema'
import { CompaniesController } from './companies.controler'
import { TasksModule } from 'src/tasks/tasks.module'
import { UsersModule } from 'src/users/users.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
        forwardRef(() => TasksModule),
        forwardRef(() => UsersModule),
    ],
    providers: [CompaniesService],
    controllers: [CompaniesController],
    exports: [CompaniesService],
})
export class CompaniesModule {}
