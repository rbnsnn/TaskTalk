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
import { ChangeTaskDto } from 'src/tasks/dtos/change-task.dto'
import { TasksService } from '../tasks/tasks.service'

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

    @SubscribeMessage('create_task')
    async createTask(@ConnectedSocket() client: Socket) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth

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

    @SubscribeMessage('rename_column')
    async renameColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() column: { columnName: string; columnId: string }
    ) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth
        const { columnName, columnId } = column

        const columnExists = await this.companiesService.findOneColumn(
            companyId,
            columnName
        )

        if (columnExists) {
            client.emit('rename_column', {
                error: 'Column already exists!',
                success: false,
                columnId,
            })
        } else {
            await this.companiesService.findOneColumnAndUpdate(
                companyId,
                columnName,
                columnId
            )
            await this.tasksService.updateMany(companyId, columnId, columnName)

            const data = await this.tasksService.getAllTasks(companyId)
            this.server.in(companyId).emit(event, data)
            client.emit('rename_column', { error: false, success: true, columnId })
        }
    }

    @SubscribeMessage('task_change')
    async changeTask(
        @ConnectedSocket() client: Socket,
        @MessageBody() changeTaskDto: ChangeTaskDto
    ) {
        const event = 'set_tasks'
        const { target, taskToChange, columnName } = changeTaskDto
        const { companyId } = client.handshake.auth
        await this.companiesService.changeTaskInColumns(target, taskToChange, companyId)
        await this.tasksService.updateTask(taskToChange.taskId, columnName, target)

        const data = await this.tasksService.getAllTasks(companyId)
        this.server.in(companyId).emit(event, data)
    }

    @SubscribeMessage('delete_column')
    async deleteColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() columnId: string
    ) {
        const event = 'set_tasks'
        const { companyId } = client.handshake.auth

        await this.companiesService.deleteColumn(companyId, columnId)
        await this.tasksService.deleteTasks(companyId, columnId)
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
