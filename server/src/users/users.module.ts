import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from 'src/companies/companies.module'
import { TasksModule } from 'src/tasks/tasks.module'
import { User, UserSchema } from './schemas/user.schema'
import { UsersController } from './users.controler'
import { UsersService } from './users.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => CompaniesModule),
        forwardRef(() => TasksModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
