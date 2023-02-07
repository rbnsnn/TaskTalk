import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { OnGatewayConnection } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'
import { CompaniesService } from '../companies/companies.service'
import { ChangeTaskDto } from '../tasks/dtos/change-task.dto'
import { TasksService } from '../tasks/tasks.service'
import { DeleteTaskDto } from '../tasks/dtos/delete-task.dto'

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
        const { newColumns, taskToChange } = changeTaskDto
        const { companyId } = client.handshake.auth
        const { taskId, assignedColumn, status } = taskToChange

        const columnsAfterChange = newColumns.map((column) => {
            return {
                ...column,
                tasks: column.tasks.map((task) => ({ taskId: task.taskId })),
            }
        })
        await this.companiesService.changeTaskInColumns(columnsAfterChange, companyId)
        await this.tasksService.updateTask(taskId, status, assignedColumn)

        const data = await this.tasksService.getAllTasks(companyId)
        this.server.to(companyId).emit(event, data)
    }

    @SubscribeMessage('delete_task')
    async deleteTask(
        @ConnectedSocket() client: Socket,
        @MessageBody() deleteTaskDto: DeleteTaskDto
    ) {
        const event = 'set_tasks'
        const { taskId, columnId } = deleteTaskDto
        const { companyId } = client.handshake.auth

        await this.companiesService.removeTask(columnId, companyId, taskId)
        await this.tasksService.deleteOneTask(companyId, taskId)

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
