import type { Types } from 'mongoose';
import {prop} from "@typegoose/typegoose";

export interface ID extends Types.ObjectId {}

export interface User {
    id: string;
    email: string;
    name: string;
    contactPhone: string;
    role: string;
}

export interface SearchUserParams {
    limit: number;
    offset: number;
    email: string;
    name: string;
    contactPhone: string;
}
export interface IUserService {
    create(data: Partial<User>): Promise<User>;
    findById(id: ID): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(params: SearchUserParams): Promise<User[]>;
}

export interface CreateUserDto {
    email: string;
    name: string;
    phone?: string;
}


