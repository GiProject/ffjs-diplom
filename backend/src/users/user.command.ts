import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as process from 'node:process';

@Injectable()
export class UserCommand {
  constructor(private readonly userService: UsersService) {}

  @Command({
    command: 'init:users',
    describe: 'create base users',
  })
  async baseInit() {
    if (!(await this.userService.findByEmail(process.env.MANAGER_EMAIL))) {
      await this.userService.create({
        email: process.env.MANAGER_EMAIL,
        password: process.env.MANAGER_PASS,
        name: process.env.MANAGER_NAME,
        contactPhone: process.env.MANAGER_PHONE,
        role: 'manager',
      });
    }
    if (!(await this.userService.findByEmail(process.env.ADMIN_EMAIL))) {
      await this.userService.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        name: process.env.ADMIN_NAME,
        contactPhone: process.env.ADMIN_PHONE,
        role: 'admin',
      });
    }
  }
}
