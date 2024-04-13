import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './hotel.model';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import {Reservation, ReservationSchema} from "../reservation/reservation.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
        MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    ],
    controllers: [HotelController],
    providers: [HotelService],
    exports: [HotelService],
})
export class HotelModule {}