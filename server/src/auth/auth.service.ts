import {
    Injectable,
    ConflictException,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import ShortUniqueId from 'short-unique-id'
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from '../users/dtos/register-user.dto'
import { CompaniesService } from '../companies/companies.service'
import { ConfigService } from '@nestjs/config'
import { Role } from '../roles/enums/role.enum'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private companiesService: CompaniesService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const [user] = await this.userService.findOne(username)

        if (user && (await bcrypt.compare(password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user

            return result
        }
        return null
    }

    async getUserData(user: any) {
        const [userInDb] = await this.userService.findOne(user.username)

        if (!userInDb) {
            throw new NotFoundException('Session expired')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, refreshToken, ...userData } = userInDb

        return {
            ...userData,
        }
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            companyId: user.companyId,
            sub: user.userId,
        }

        const [userInDb] = await this.userService.findOne(user.username)
        if (!userInDb) {
            throw new NotFoundException('Username not found')
        }

        const authToken = await this.getAuthToken(payload)
        const refreshToken = await this.getRefreshToken(payload)

        await this.updateRefreshToken(user.username, refreshToken)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = userInDb

        return {
            ...userData,
            authToken,
            refreshToken,
        }
    }

    async logout(user: any) {
        await this.updateRefreshToken(user.username, null)
    }

    async register(user: RegisterUserDto) {
        const [companyInDb] = await this.companiesService.findOne(user.companyName)
        if (companyInDb) {
            throw new ConflictException('Company already in use')
        }

        const [userInDb] = await this.userService.findOne(user.username)
        if (userInDb) {
            throw new ConflictException('Username in use')
        }

        const [emailInUse] = await this.userService.findOneByEmail(user.email)
        if (emailInUse) {
            throw new ConflictException('Email in use')
        }

        const userUid = new ShortUniqueId({ length: 10 })
        const generatedUserUid = userUid()
        const companyUid = new ShortUniqueId({ length: 6 })
        const generatedCompanyUid = companyUid()

        const newCompany = {
            companyId: generatedCompanyUid,
            companyName: user.companyName,
            users: [{ userId: generatedUserUid }],
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
            roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
            created: new Date(),
            colorMode: user.colorMode,
        }

        return this.userService.create(newUser)
    }

    async getAuthToken(payload: any) {
        const authToken = await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        })
        return authToken
    }

    async getRefreshToken(payload: any) {
        const authToken = await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
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

        const tokenMatches = refreshToken === user.refreshToken

        if (!tokenMatches) throw new ForbiddenException('Access Denied')

        const payload = {
            username: user.username,
            companyId: user.companyId,
            sub: user.userId,
        }

        const newAuthToken = await this.getAuthToken(payload)
        const newRefreshToken = await this.getRefreshToken(payload)

        await this.updateRefreshToken(user.username, newRefreshToken)

        return {
            authToken: newAuthToken,
            refreshToken: newRefreshToken,
        }
    }
}
