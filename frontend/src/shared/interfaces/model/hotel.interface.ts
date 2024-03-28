import User from "./user.interface";

export interface Hotel {
    _id: string;
    title: string;
    description: string;
    image: string;
}

export interface hotelData {
    users: Hotel[]
    count: number
}

export interface HotelSearchParams {
    title: string;
    dateIn: Date;
    dateOut: Date;
    limit?: number;
    offset?: number
}