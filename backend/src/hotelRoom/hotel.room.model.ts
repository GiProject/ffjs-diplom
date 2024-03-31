import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Hotel} from "../hotel/hotel.model";

export type HotelRoomDocument = HotelRoom & Document;
@Schema()
export class HotelRoom {
    _id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
    public hotel: Hotel;

    @Prop()
    public description: string;

    @Prop({ default: [] })
    public images: string[];

    @Prop({ default: new Date() })
    public createdAt: Date;

    @Prop({ default: new Date() })
    public updatedAt: Date;

    @Prop({ default: true })
    public isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
