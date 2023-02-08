import {
    Controller,
    Post,
    Get,
    UseGuards,
    Body,
    Request,
    Delete,
    Param,
    Patch,
} from '@nestjs/common'
import { Roles } from 'src/roles/decorators/roles.decorator'
import { Role } from 'src/roles/enums/role.enum'
import { UsersService } from './users.service'
import { RolesGuard } from 'src/roles/guards/roles.guard'
import { AddUserDto } from './dtos/add-user.dto'
import { DataSerializer } from '../interceptors/data-serializer.interceptor'
import { UserSerializeDto } from './dtos/user-serialize.dto'

@DataSerializer(UserSerializeDto)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(RolesGuard)
    @Post('/new')
    @Roles(Role.ADMIN)
    async createUserByAdmin(@Body() body: AddUserDto) {
        return this.userService.adminCreate(body)
    }

    @Get('/all')
    async getAllUsers(@Request() req) {
        return this.userService.findAll(req.user.companyId)
    }

    @UseGuards(RolesGuard)
    @Delete('/:id')
    @Roles(Role.ADMIN)
    async deleteUser(@Param('id') id: string) {
        return this.userService.findOneAndDelete(id)
    }

    @Get('/info/:id')
    async getUserInfo(@Param('id') id: string) {
        const { username, firstName, lastName, roles, email } =
            await this.userService.findOneById(id)

        return { username, firstName, lastName, roles, email }
    }

    @Patch('/mode')
    async changeColorMode(@Request() req, @Body() body: string) {
        const { username } = req.user
        const data = await this.userService.findOneAndUpdate(username, body, true)
        return data.colorMode
    }
}
