import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { WsException } from '@nestjs/websockets'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }

    async validate(payload: any) {
        const { username } = payload
        try {
            return this.usersService.findOne(username)
        } catch (error) {
            throw new WsException('Unauthorized access')
        }
    }
}
