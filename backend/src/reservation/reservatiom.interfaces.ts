import {Reservation} from "./reservation.model";
import {Types} from "mongoose";

export interface ID extends Types.ObjectId {}
export interface SearchReservationParams {
    limit: number;
    offset: number;
    userId: string;
}

export interface ReservationDto {
    userId: string;
    hotelId: ID;
    roomId: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface ReservationSearchOptions {
    userId?: string;
    roomId?: string;
    dateStart?: Date;
    dateEnd?: Date;
    limit?: number;
    offset?: number;
}

export interface IReservation {
    addReservation(data: ReservationDto): Promise<Reservation>;
    removeReservation(id: string): Promise<void>;
    getReservations(
        filter: ReservationSearchOptions,
    ): Promise<Array<Reservation>>;
}

