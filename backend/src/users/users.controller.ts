import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, SearchUserInputParams, SearchUserParams } from "./user.interfaces";
import { UserDocument } from "./user.model";
import { Roles } from "../guards/role.decorator";
import { RoleGuard } from "../guards/role.guard";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller("api/users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  @Roles('manager')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll(@Query() query: SearchUserInputParams) {
    const params: SearchUserParams = {
      ...query,
      email: query.query,
      name: query.query,
      contactPhone: query.query
    };

    return await this.userService.findAll(params);
  }

}