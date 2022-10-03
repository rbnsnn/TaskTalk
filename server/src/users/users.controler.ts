import { Controller, Post, Get, UseGuards, Body, Request, Req } from "@nestjs/common";
import { Roles } from "src/roles/decorators/roles.decorator";
import { Role } from "src/roles/enums/role.enum";
import { UsersService } from "./users.service";
import { RolesGuard } from "src/roles/guards/roles.guard";
import { AddUserDto } from "./dtos/add-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @UseGuards(RolesGuard)
    @Post('/new')
    @Roles(Role.ADMIN)
    createUserByAdmin(@Body() body: AddUserDto) {
        return this.userService.adminCreate(body)
    }
}