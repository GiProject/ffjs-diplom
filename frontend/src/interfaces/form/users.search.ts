import User from "../model/user.interface";

export interface SearchUserParams {
    limit?: number;
    offset?: number;
    query?: string;
}

export interface userData {
    users: User[]
    count: number
}