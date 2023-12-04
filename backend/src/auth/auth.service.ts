import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string) {
            const user = await this.usersService.findByEmail(email);

            if (!user) {
                return null;
            }

            const isPasswordValidate = await bcrypt.compare(password, user.passwordHash);

            if (isPasswordValidate) {
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    contactPhone: user.contactPhone,
                    role: user.role,
                };
            }

            return null;
    }

}