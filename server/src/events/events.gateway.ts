import { UsePipes } from '@nestjs/common'
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateTaskDto } from '../tasks/dtos/create-task.dto'
import { TasksService } from '../tasks/tasks.service'
import { WSValidationPipe } from './pipes/gateway.pipe'

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

    @UsePipes(WSValidationPipe)
    @SubscribeMessage('create_task')
    async createTask(
        @MessageBody() data: CreateTaskDto,
        @ConnectedSocket() client: Socket
    ) {
        const event = 'create_task'
        const user = client.handshake.auth
        const response = await this.tasksService.createTask(data, user)

        return { event, data: response }
    }

    @SubscribeMessage('get_tasks')
    async getAll(@ConnectedSocket() client: Socket) {
        const event = 'get_tasks'
        const { companyId } = client.handshake.auth

        const data = await this.tasksService.getAllTasks(companyId)

        return { event, data }
    }
}
