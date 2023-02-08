import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common'
import { RegisterUserDto } from 'src/users/dtos/register-user.dto'
import { AuthService } from './auth.service'
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from './decorators/public-route.decorator'
import { DataSerializer } from 'src/interceptors/data-serializer.interceptor'
import { LoginSerializeDto } from './dtos/login-serializer.interceptor'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @DataSerializer(LoginSerializeDto)
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Public()
    @Post('/register')
    async register(@Body() body: RegisterUserDto) {
        return this.authService.register(body)
    }

    @DataSerializer(LoginSerializeDto)
    @Get('/userdata')
    async getUserData(@Request() req) {
        return this.authService.getUserData(req.user)
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Public()
    @Get('/refresh')
    async refreshTokens(@Request() req) {
        const { username, refreshToken } = req.user
        return this.authService.refreshTokens(username, refreshToken)
    }
}
