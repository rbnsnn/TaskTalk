import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import ShortUniqueId from 'short-unique-id';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private companiesService: CompaniesService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const [user] = await this.userService.findOne(username)

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user

            return result
        }
        return null
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user.userId }

        return {
            authToken: this.jwtService.sign(payload)
        }
    }

    async register(user: CreateUserDto) {
        const [companyInDb] = await this.companiesService.findOne(user.companyName)
        if (companyInDb) {
            throw new ConflictException('Company already in use')
        }

        const [userInDb] = await this.userService.findOne(user.username)
        if (userInDb) {
            throw new ConflictException('Username in use')
        }

        const userUid = new ShortUniqueId({ length: 10 })
        const generatedUserUid = userUid()
        const companyUid = new ShortUniqueId({ length: 6 })
        const generatedCompanyUid = companyUid()

        const newCompany = {
            companyId: generatedCompanyUid,
            companyName: user.companyName,
            users: [generatedUserUid]
        }

        this.companiesService.create(newCompany)

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = {
            userId: generatedUserUid,
            companyId: generatedCompanyUid,
            companyName: user.companyName,
            username: user.username,
            password: hashedPassword
        }

        return this.userService.create(newUser)
    }

}
