import {Injectable, Query} from '@nestjs/common';
import {UserDocument, UserModel, UserSchema} from './user.model';
import {CreateUserDto, ID, IUserService, SearchUserParams, User} from './user.interfaces';
import {InjectModel, Schema} from "@nestjs/mongoose";
import {Model, Promise} from "mongoose";
import * as console from "console";

@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    ) {
    }

    public async create(data: CreateUserDto) {
        const user = new this.userModel(data);
        return await user.save();
    }

    public async update(data: CreateUserDto) {
        const user = new this.userModel(data);
        return await user.save();
    }

    public async findAll(query: SearchUserParams) {
        const {email, name, contactPhone} = query;
        const findParams = {
            email: {$regex: new RegExp(email, 'i')},
            name: {$regex: new RegExp(name, 'i')},
            contactPhone: {$regex: new RegExp(contactPhone, 'i')},
        };

        return this.userModel.find(findParams, '-passwordHash');
    }

    findByEmail(email: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    findById(id: ID): Promise<User> {
        return Promise.resolve(undefined);
    }

}