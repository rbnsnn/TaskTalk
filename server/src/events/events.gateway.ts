import { UsePipes } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto'
import { TasksService } from 'src/tasks/tasks.service'
import { WSValidationPipe } from './pipes/gateway.pipe'

@UsePipes(WSValidationPipe)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    constructor(private tasksService: TasksService) {}
    @WebSocketServer()
    server: Server
    socket: Socket

    @SubscribeMessage('create_task')
    findAll(@MessageBody() data: CreateTaskDto) {
        return this.tasksService.createTask(data)
    }
}
