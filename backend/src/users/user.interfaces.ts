import type { Types } from 'mongoose';
export interface ID extends Types.ObjectId {}

export interface IUser {
    id: string;
    email: string;
    name: string;
    contactPhone: string;
    role: string;
    passwordHash: string;
}

export interface SearchUserParams {
    limit: number;
    offset: number;
    email: string;
    name: string;
    contactPhone: string;
}
export interface IUserService {
    create(data: Partial<IUser>): Promise<IUser>;
    findById(id: ID): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    findAll(params: SearchUserParams): Promise<IUser[]>;
}

export interface CreateUserDto {
    email: string;
    name: string;
    phone?: string;
}

export interface IUserRegistration {
    email: string;
    name: string;
    phone: string;
    password: string;
}
