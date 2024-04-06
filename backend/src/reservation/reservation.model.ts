import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";
import {User} from "../users/user.model";
import {Hotel} from "../hotel/hotel.model";
import {HotelRoom} from "../hotelRoom/hotel.room.model";
import {ID} from "./reservatiom.interfaces";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({required: true, type: mongoose.Types.ObjectId, ref: () => User.name })
    userId: ID;

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: () => Hotel.name })
    hotelId: ID;

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: () => HotelRoom.name })
    roomId: ID;

    @Prop({ required: true })
    public dateStart: Date;

    @Prop({ required: true })
    public dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);