import {
    Controller,
    Post,
    Get,
    UseGuards,
    Body,
    Request,
} from '@nestjs/common';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { AddUserDto } from './dtos/add-user.dto';
import { UsersSerializer } from './interceptors/users-serializer.interceptor';
import { UserSerializeDto } from './dtos/user-serialize.dto';

@UsersSerializer(UserSerializeDto)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(RolesGuard)
    @Post('/new')
    @Roles(Role.ADMIN)
    createUserByAdmin(@Body() body: AddUserDto) {
        return this.userService.adminCreate(body);
    }

    @Get('/all')
    getAllUsers(@Request() req) {
        return this.userService.findAll(req.user.companyId);
    }
}
