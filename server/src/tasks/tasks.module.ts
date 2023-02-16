import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksService } from './tasks.service'
import { Task, TaskSchema } from './schemas/task.schema'
import { TasksController } from './tasks.controler'
import { CompaniesModule } from '../companies/companies.module'
import { UsersModule } from 'src/users/users.module'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        forwardRef(() => CompaniesModule),
        forwardRef(() => UsersModule),
    ],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TasksModule {}
