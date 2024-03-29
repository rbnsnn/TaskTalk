import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import { CreatedBy } from '../types/created-by-interface'
import { Priority } from '../types/priority.enum'
import { StatusI } from '../types/status.type'
import { LabelI } from '../types/task-label.type'

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop({ required: true, unique: true })
    taskId: string

    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    createdBy: CreatedBy[]

    @Prop({ required: true })
    created: Date

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop()
    assignedUsers: CompanyUsers[] | null

    @Prop({ type: Object })
    status: StatusI

    @Prop()
    priority: Priority

    @Prop()
    labels: LabelI[] | null

    @Prop({ required: true })
    assignedColumn: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
