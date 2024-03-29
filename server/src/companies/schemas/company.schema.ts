import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ColumnInterface } from 'src/tasks/types/column.interface'
import { LabelI } from 'src/tasks/types/task-label.type'
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
    taskColumns: ColumnInterface[]

    @Prop()
    labels: LabelI[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)
