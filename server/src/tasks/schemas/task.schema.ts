import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CompanyUsers } from 'src/companies/types/company-users.interface'

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop({ required: true, unique: true })
    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    createdBy: string

    @Prop({ required: true })
    created: Date

    @Prop()
    assignedUsers: CompanyUsers[]

    @Prop({ required: true })
    assignedColumn: string
}

export const UserSchema = SchemaFactory.createForClass(Task)
