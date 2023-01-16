import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common'
import { RegisterUserDto } from 'src/users/dtos/register-user.dto'
import { AuthService } from './auth.service'
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from './decorators/public-route.decorator'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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

    // @UseGuards(RolesGuard)
    // @Get('/user')
    // @Roles(Role.ADMIN)
    // getwithguard(@Request() req) {
    //     return true
    // }
}
