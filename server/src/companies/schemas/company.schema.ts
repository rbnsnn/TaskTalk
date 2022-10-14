import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TaskInterface } from 'src/tasks/types/task.interface'
import { CompanyUsers } from '../types/company-users.interface'

export type CompanyDocument = Company & Document

@Schema()
export class Company {
    @Prop({ required: true, unique: true })
    companyId: string

    @Prop({ required: true, unique: true })
    companyName: string

    @Prop({ required: true })
    users: CompanyUsers[]

    @Prop()
    tasksColumns: TaskInterface[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)
