import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import * as mongoose from 'mongoose';
import {CreateUserDto} from "../users/user.interfaces";
import {AuthService} from "./auth.service";

@Controller('api')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('/users/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('client/register')
    async signup(@Body() userRegistration: CreateUserDto) {
        return await this.usersService.create(userRegistration);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async profile(@Request() req: any) {
        return req.user;
    }
}