import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get()
    log() {
        return this.usersService.findOne('cipa')
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body)
    }
}
