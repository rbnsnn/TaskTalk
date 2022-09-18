import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import ShortUniqueId from 'short-unique-id';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/users/enums/user-roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private companiesService: CompaniesService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const [user] = await this.userService.findOne(username)

        if (user && await bcrypt.compare(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user

            return result
        }
        return null
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId
        }

        const [userInDb] = await this.userService.findOne(user.username)
        if (!userInDb) {
            throw new NotFoundException('Username not found')
        }
        console.log
        const authToken = await this.getAuthToken(payload)
        const refreshToken = await this.getRefreshToken(payload)

        await this.updateRefreshToken(user.username, refreshToken)

        const {
            companyId,
            companyName,
            userId,
            username,
            email,
            roles
        } = userInDb

        return {
            companyId,
            companyName,
            userId,
            username,
            email,
            roles,
            authToken,
            refreshToken
        }
    }

    async logout(user: any) {
        await this.updateRefreshToken(user.username, null)
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
            companyId: generatedCompanyUid,
            companyName: user.companyName,
            userId: generatedUserUid,
            username: user.username,
            email: user.email,
            password: hashedPassword,
            roles: [Roles.ADMIN, Roles.MODERATOR, Roles.USER]
        }

        return this.userService.create(newUser)
    }

    async getAuthToken(payload: any) {
        const authToken = await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME')
        })
        return authToken
    }

    async getRefreshToken(payload: any) {
        const authToken = await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME')
        })
        return authToken
    }

    async updateRefreshToken(username: string, token: string) {
        if (token) {
            await this.userService.findOneAndUpdate(username, { refreshToken: token })
        } else {
            await this.userService.findOneAndUpdate(username, { refreshToken: null })
        }
    }

    async refreshTokens(username: string, refreshToken: string) {
        const [user] = await this.userService.findOne(username)
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied!')
        }

        const tokenMatches = (refreshToken === user.refreshToken)
        if (!tokenMatches) throw new ForbiddenException('Access Denied')

        const payload = {
            username: user.username,
            sub: user.userId
        }

        const newAuthToken = await this.getAuthToken(payload)
        const newRefreshToken = await this.getRefreshToken(payload)

        await this.updateRefreshToken(user.username, newRefreshToken)

        return {
            authToken: newAuthToken,
            refreshToken: newRefreshToken
        }
    }
}
