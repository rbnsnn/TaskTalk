import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { TasksService } from 'src/tasks/tasks.service'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    constructor(private tasksService: TasksService) {}
    @WebSocketServer()
    server: Server

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any) {
        return { event: 'events', data: 'test' }
    }
}
