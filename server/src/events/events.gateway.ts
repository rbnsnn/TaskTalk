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
import { TaskEvent } from './types/task-event-enum.type'
import { ColorChangeDto } from 'src/companies/dtos/column-color-change.dto'

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

    @SubscribeMessage(TaskEvent.CreateTask)
    async createTask(@ConnectedSocket() client: Socket) {
        const { companyId } = client.handshake.auth

        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(TaskEvent.SetTasks, data)
    }

    @SubscribeMessage(TaskEvent.CreateColumn)
    async createColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() columnName: string
    ) {
        const { companyId } = client.handshake.auth

        const columnExists = await this.companiesService.findOneColumn(
            companyId,
            columnName
        )

        if (columnExists) {
            client.emit(TaskEvent.CreateColumn, {
                error: 'Column already exists!',
                success: false,
            })
        } else {
            await this.companiesService.addColumn(companyId, columnName)

            const data = await this.tasksService.getAllTasks(companyId)

            this.server.in(companyId).emit(TaskEvent.SetTasks, data)
            client.emit(TaskEvent.CreateColumn, { error: false, success: true })
        }
    }

    @SubscribeMessage(TaskEvent.RenameColumn)
    async renameColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() column: { columnName: string; columnId: string; color: string }
    ) {
        const { companyId } = client.handshake.auth
        const { columnName, columnId, color } = column

        const columnExists = await this.companiesService.findOneColumn(
            companyId,
            columnName
        )

        if (columnExists) {
            client.emit(TaskEvent.RenameColumn, {
                error: 'Column already exists!',
                success: false,
                columnId,
            })
        } else {
            await this.companiesService.findOneColumnAndUpdate(
                companyId,
                { name: columnName },
                columnId
            )
            await this.tasksService.updateMany(companyId, columnId, {
                name: columnName,
                color,
            })

            const data = await this.tasksService.getAllTasks(companyId)
            this.server.in(companyId).emit(TaskEvent.SetTasks, data)
            client.emit(TaskEvent.RenameColumn, { error: false, success: true, columnId })
        }
    }

    @SubscribeMessage(TaskEvent.TaskChange)
    async changeTask(
        @ConnectedSocket() client: Socket,
        @MessageBody() changeTaskDto: ChangeTaskDto
    ) {
        const { newColumns, taskToChange } = changeTaskDto
        const { companyId } = client.handshake.auth

        const columnsAfterChange = newColumns.map((column) => {
            return {
                ...column,
                tasks: column.tasks.map((task) => ({ taskId: task.taskId })),
            }
        })
        await this.companiesService.changeTaskInColumns(columnsAfterChange, companyId)

        if (taskToChange) {
            const { taskId, assignedColumn, status } = taskToChange
            await this.tasksService.updateTask(taskId, status, assignedColumn)
        }

        const data = await this.tasksService.getAllTasks(companyId)
        this.server.to(companyId).emit(TaskEvent.SetTasks, data)
    }

    @SubscribeMessage(TaskEvent.DeleteTask)
    async deleteTask(
        @ConnectedSocket() client: Socket,
        @MessageBody() deleteTaskDto: DeleteTaskDto
    ) {
        const { taskId, columnId } = deleteTaskDto
        const { companyId } = client.handshake.auth

        await this.companiesService.removeTask(columnId, companyId, taskId)
        await this.tasksService.deleteOneTask(companyId, taskId)

        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(TaskEvent.SetTasks, data)
    }

    @SubscribeMessage(TaskEvent.DeleteColumn)
    async deleteColumn(
        @ConnectedSocket() client: Socket,
        @MessageBody() columnId: string
    ) {
        const { companyId } = client.handshake.auth

        // await this.companiesService.deleteColumn(companyId, columnId)
        await this.tasksService.deleteTasks(companyId, columnId)

        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(TaskEvent.SetTasks, data)
    }

    @SubscribeMessage(TaskEvent.ColumnColorChange)
    async changeColumnColor(
        @ConnectedSocket() client: Socket,
        @MessageBody() colorChangeDto: ColorChangeDto
    ) {
        const { companyId } = client.handshake.auth
        const { columnId, color, name } = colorChangeDto

        await this.companiesService.findOneColumnAndUpdate(companyId, { color }, columnId)
        await this.tasksService.updateMany(companyId, columnId, { name, color })

        const data = await this.tasksService.getAllTasks(companyId)

        this.server.in(companyId).emit(TaskEvent.SetTasks, data)
    }

    @SubscribeMessage(TaskEvent.GetTasks)
    async getAll(@ConnectedSocket() client: Socket) {
        const { companyId } = client.handshake.auth
        const data = await this.tasksService.getAllTasks(companyId)
        return { event: TaskEvent.SetTasks, data }
    }

    @SubscribeMessage(TaskEvent.LabelUpdate)
    async updateLabel(@ConnectedSocket() client: Socket) {
        const { companyId } = client.handshake.auth
        this.server.in(companyId).emit(TaskEvent.LabelUpdate)
    }
}
