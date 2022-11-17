import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import { Priority } from '../types/priority.enum'

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop({ required: true, unique: true })
    taskId: string

    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    createdBy: string

    @Prop({ required: true })
    created: Date

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop()
    assignedUsers: CompanyUsers[] | null

    @Prop()
    status: string

    @Prop()
    priority: Priority

    @Prop()
    labels: string[] | null

    @Prop({ required: true })
    assignedColumn: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
