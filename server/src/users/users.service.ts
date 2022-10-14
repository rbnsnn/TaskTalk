import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { RegisterUserDto } from './dtos/register-user.dto'
import { AddUserDto } from './dtos/add-user.dto'
import ShortUniqueId from 'short-unique-id'
import * as bcrypt from 'bcrypt'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private companiesService: CompaniesService
    ) {}

    async create(createUserDto: RegisterUserDto): Promise<boolean> {
        const createdUser = await new this.userModel(createUserDto)

        createdUser.save()
        return true
    }

    async adminCreate(createUserDto: AddUserDto): Promise<boolean> {
        const [userInDb] = await this.findOne(createUserDto.username)
        if (userInDb) {
            throw new ConflictException('Username in use')
        }

        const [emailInUse] = await this.findOneByEmail(createUserDto.email)
        if (emailInUse) {
            throw new ConflictException('Email in use')
        }

        const userUid = new ShortUniqueId({ length: 10 })
        const generatedUserId = userUid()

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        const userData = {
            ...createUserDto,
            password: hashedPassword,
            userId: generatedUserId,
            created: new Date(),
        }

        const createdUser = await new this.userModel(userData)

        this.companiesService.findOneAndUpdate(createUserDto.companyName, {
            $push: { users: { userId: generatedUserId } },
        })
        createdUser.save()
        return true
    }

    async findOne(username: string): Promise<User[]> {
        const user = await this.userModel.find({ username }).lean()

        return user
    }

    async findOneByEmail(email: string): Promise<User[]> {
        const user = await this.userModel.find({ email })

        return user
    }

    async findOneAndUpdate(username: string, payload: any): Promise<UserDocument> {
        const user = await this.userModel.findOneAndUpdate({ username }, payload)

        return user
    }

    async findAll(parameter): Promise<UserDocument[]> {
        const users = await this.userModel.find({ parameter })

        return users
    }

    async findOneAndDelete(userId: string): Promise<boolean> {
        const user = await this.userModel.findOneAndDelete({ userId })

        if (!user) {
            throw new NotFoundException('User not found')
        }
        await this.companiesService.deleteUserFromCompany(userId)
        return true
    }
}
