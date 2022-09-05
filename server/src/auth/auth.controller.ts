import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private configService: ConfigService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        console.log(this.configService.get('JWT_SECRET'))
        return this.authService.login(req.user)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/register')
    async register(@Body() body) {
        return this.authService.register(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Request() req) {
        console.log(req.user)
        return req.user
    }

}