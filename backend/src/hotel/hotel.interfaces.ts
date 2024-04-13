import {Hotel, HotelDocument} from "./hotel.model";
import mongoose, {Mongoose, Promise, Types} from "mongoose";
import {HotelRoom} from "../hotelRoom/hotel.room.model";
import { User } from "../users/user.model";

export interface ID extends Types.ObjectId {}
export interface SearchHotelParams {
    limit: number;
    offset: number;
    title: string;
    isFree?: boolean;
    dateStart: Date;
    dateEnd: Date;
}

export interface SearchHotelQuery {
    title?: object;
    _id?: object
}

export interface UpdateHotelParams {
    title: string;
    description: string;
    delete_image: number[];
    images: object[];
}

export interface UpdateHotelRoomParams {
    title: string;
    description: string;
    delete_image: number[];
    images: object[];
}
export interface IHotelService {
    create(data: any): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: SearchHotelParams): Promise<any>;
    update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}

export interface SearchRoomsParams {
    hotel: ID;
    limit?: number;
    offset?: number;
    isEnabled?: boolean;
}

export interface IHotelRoomService {
    create(data: ICreateHotelRoomDto): Promise<HotelRoom>;
    findById(id: ID): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<any>;
    update(id: ID, data: UpdateHotelRoomParams): Promise<HotelRoom>;
}

export interface ICreateHotelDto {
    title: string;
    description: string;
}

export interface ICreateHotelRoomDto {
    id: string;
    hotel: Hotel;
    description: string;
}

export interface HotelReturnInterface {
    count: number,
    data: Hotel[]
}

export interface FileInterface {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: string,
    size: number,
}
