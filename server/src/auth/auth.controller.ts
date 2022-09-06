import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Request() req) {
        console.log(req.user)
        return req.user
    }

}