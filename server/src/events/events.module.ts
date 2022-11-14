import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'

import { TasksModule } from 'src/tasks/tasks.module'

@Module({
    imports: [TasksModule],
    providers: [EventsGateway],
})
export class EventsModule {}
