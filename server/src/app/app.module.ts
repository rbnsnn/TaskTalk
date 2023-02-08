import { Module, ValidationPipe } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { APP_PIPE } from '@nestjs/core'
import { TasksModule } from 'src/tasks/tasks.module'
import { EventsModule } from 'src/events/events.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE),
        UsersModule,
        AuthModule,
        TasksModule,
        EventsModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
