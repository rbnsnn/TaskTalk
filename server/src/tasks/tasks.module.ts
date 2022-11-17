import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksService } from './tasks.service'
import { Task, TaskSchema } from './schemas/task.schema'
import { TasksController } from './tasks.controler'

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TasksModule {}
