import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { TasksModule } from 'src/tasks/tasks.module'
import { CompaniesModule } from 'src/companies/companies.module'

@Module({
    imports: [TasksModule, CompaniesModule],
    providers: [EventsGateway],
})
export class EventsModule {}
