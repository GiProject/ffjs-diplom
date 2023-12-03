import {Body, Controller, Get, Patch, Post, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto, SearchUserParams} from "./user.interfaces";
import {UserDocument} from "./user.model";

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll(@Query() query: SearchUserParams) {
        return await this.userService.findAll(query);
    }
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}