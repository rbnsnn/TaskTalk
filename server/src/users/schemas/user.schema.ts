import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from '../../roles/enums/role.enum'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    companyName: string

    @Prop({ required: true, unique: true })
    userId: string

    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop()
    refreshToken: string

    @Prop({ required: true })
    roles: Role[]

}

export const UserSchema = SchemaFactory.createForClass(User)