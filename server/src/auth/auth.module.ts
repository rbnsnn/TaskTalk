import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './guards/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './guards/jwt-auth.strategy'
import { CompaniesModule } from 'src/companies/companies.module'
import { RefreshTokenStrategy } from './guards/jwt-refresh.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { WsJwtStrategy } from './guards/ws-auth.strategy'

@Module({
    imports: [
        UsersModule,
        CompaniesModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshTokenStrategy,
        WsJwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AuthModule {}
