import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Role } from 'src/roles/enums/role.enum';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Public } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Public()
    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body)
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Public()
    @Get('/refresh')
    refreshTokens(@Request() req) {
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