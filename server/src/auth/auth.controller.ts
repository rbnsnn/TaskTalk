import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles } from 'src/users/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/userinfo')
    async getProfile(@Request() req) {
        return req.user
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Get('/refresh')
    refreshTokens(@Request() req) {
        const { username, refreshToken } = req.user
        return this.authService.refreshTokens(username, refreshToken)
    }

    @UseGuards(RolesGuard)
    @Get('/user')
    @Roles(Role.ADMIN)
    getwithguard(@Body() body) {
        console.log(body)
    }
}