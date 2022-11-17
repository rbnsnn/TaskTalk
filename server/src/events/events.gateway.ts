import { UsePipes } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateTaskDto } from '../tasks/dtos/create-task.dto'
import { TasksService } from '../tasks/tasks.service'
import { WSValidationPipe } from './pipes/gateway.pipe'

@UsePipes(WSValidationPipe)
@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class EventsGateway {
    constructor(private tasksService: TasksService) {}
    @WebSocketServer()
    server: Server
    socket: Socket

    @SubscribeMessage('create_task')
    async createTask(@MessageBody() data: CreateTaskDto) {
        const event = 'create_task'
        const response = await this.tasksService.createTask(data)

        return { event, data: response }
    }

    @SubscribeMessage('get_tasks')
    async getAll(@MessageBody() company: any) {
        console.log(company)
        const event = 'get_tasks'
        const data = await this.tasksService.getAllTasks(company)
        console.log(company)
        return { event, data }
    }
}
