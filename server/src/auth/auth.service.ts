import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const [user] = await this.userService.findOne(username)

        if (user && bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user._id.toString() }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(user: CreateUserDto) {
        const hash = await bcrypt.hash(user.password, 10)

        const newUser = {
            username: user.username,
            password: hash
        }

        this.userService.create(newUser)
    }

}
