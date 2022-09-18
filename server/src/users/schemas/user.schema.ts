import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Roles } from '../enums/user-roles.enum'
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
    roles: Roles[]

}

export const UserSchema = SchemaFactory.createForClass(User)