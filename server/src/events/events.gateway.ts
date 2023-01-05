import { UsePipes } from '@nestjs/common'
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { OnGatewayConnection } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'
import { CompaniesService } from 'src/companies/companies.service'
import { CreateTaskDto } from '../tasks/dtos/create-task.dto'
import { TasksService } from '../tasks/tasks.service'
import { WSValidationPipe } from './pipes/gateway.pipe'

@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class EventsGateway implements OnGatewayConnection {
    constructor(
        private tasksService: TasksService,
        private companiesService: CompaniesService
    ) {}
    @WebSocketServer()
    server: Server
    socket: Socket

    handleConnection(client: Socket) {
        client.on('join_room', (room) => {
            client.join(room)
        })
    }

    @UsePipes(WSValidationPipe)
    @SubscribeMessage('create_task')
    async createTask(
        @MessageBody() task: CreateTaskDto,
        @ConnectedSocket() client: Socket
    ) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth
        const user = client.handshake.auth

        await this.tasksService.createTask(task, user)
        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(event, data)
    }

    @SubscribeMessage('create_column')
    async createColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() columnName: string
    ) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth

        const columnExists = await this.companiesService.findOneColumn(
            companyId,
            columnName
        )

        if (columnExists) {
            client.emit('create_column', {
                error: 'Column already exists!',
                success: false,
            })
        } else {
            await this.companiesService.addColumn(companyId, columnName)

            const data = await this.tasksService.getAllTasks(companyId)

            this.server.in(companyId).emit(event, data)
            client.emit('create_column', { error: false, success: true })
        }
    }

    @SubscribeMessage('delete_column')
    async deleteColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() columnId: string
    ) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth

        await this.companiesService.deleteColumn(companyId, columnId)
        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(event, data)
    }

    @SubscribeMessage('get_tasks')
    async getAll(@ConnectedSocket() client: Socket) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth
        const data = await this.tasksService.getAllTasks(companyId)
        return { event, data }
    }
}
