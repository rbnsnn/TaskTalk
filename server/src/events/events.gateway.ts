import { UsePipes, Req, UseGuards } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WsAuthGuard } from '../auth/guards/ws-auth.guard'
import { CreateTaskDto } from '../tasks/dtos/create-task.dto'
import { TasksService } from '../tasks/tasks.service'
import { WSValidationPipe } from './pipes/gateway.pipe'

@UseGuards(WsAuthGuard)
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
    async findAll(@MessageBody() data: CreateTaskDto, @Req() req) {
        const event = 'create_task'
        const response = await this.tasksService.createTask(data)

        return { event, response }
    }
}
