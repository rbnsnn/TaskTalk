import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose'
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto) {
        const createdUser = await new this.userModel(createUserDto)

        createdUser.save()
        return true
    }

    async findOne(username: string): Promise<User[]> {
        const user = await this.userModel.find({ username }).lean()

        return user
    }
}
