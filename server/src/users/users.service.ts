import {
    Injectable,
    NotFoundException,
    ConflictException,
    Inject,
    forwardRef,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { RegisterUserDto } from './dtos/register-user.dto'
import { AddUserDto } from './dtos/add-user.dto'
import { CompaniesService } from 'src/companies/companies.service'
import { CompanyUsers } from 'src/companies/types/company-users.interface'
import ShortUniqueId from 'short-unique-id'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject(forwardRef(() => CompaniesService))
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
        const user = await this.userModel
            .find({
                $or: [{ username: username }, { email: username }],
            })
            .collation({ locale: 'en', strength: 1 })
            .lean()

        return user
    }

    async findOneById(userId: string): Promise<User> {
        const user = await this.userModel.findOne({ userId })

        return user
    }

    async findOneByEmail(email: string): Promise<User[]> {
        const user = await this.userModel
            .find({ email })
            .collation({ locale: 'en', strength: 1 })

        return user
    }

    async findOneAndUpdate(
        username: string,
        payload: any,
        newData = false
    ): Promise<UserDocument> {
        const user = await this.userModel.findOneAndUpdate({ username }, payload, {
            new: newData,
        })
        return user
    }

    async findAll(companyId): Promise<UserDocument[]> {
        const users = await this.userModel.find({ companyId })

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

    async addAssignedTask(users: CompanyUsers[], taskId: string) {
        const usersToUpdate = users.map((user) => user.userId)
        await this.userModel.updateMany(
            {
                userId: {
                    $in: usersToUpdate,
                },
            },
            {
                $push: { assignedTasks: taskId },
            }
        )
    }

    async deleteAssignedTask(users: CompanyUsers[], taskId: string) {
        const usersToUpdate = users.map((user) => user.userId)
        await this.userModel.updateMany(
            {
                userId: {
                    $in: usersToUpdate,
                },
            },
            {
                $pull: { assignedTasks: taskId },
            }
        )
    }

    async deleteAllAssignedTasks(users: CompanyUsers[], tasks: string[]) {
        const usersToUpdate = users.map((user) => user.userId)
        await this.userModel.updateMany(
            {
                userId: {
                    $in: usersToUpdate,
                },
            },
            {
                $pull: { assignedTasks: { $in: tasks } },
            }
        )
    }
}
