import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {formatInTimeZone} from 'date-fns-tz';

import {ReservationService} from './reservation.service';
import {ReservationDto, SearchReservationParams} from "./reservatiom.interfaces";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {User} from "../decorations/user.decorator";
import {UserEntity} from "../users/user.entity";
import {ID} from "../hotel/hotel.interfaces";

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post('/hotels/:hotelId/rooms/:roomId/reservation')
    async add(
        @Param() params: {hotelId: ID, roomId: ID},
        @User() user: UserEntity,
        @Body() body: any,
    ) {
        return await this.reservationService.addReservation({
            userId: user.id,
            hotelId: params.hotelId,
            roomId: params.roomId,
            dateStart: new Date(
                formatInTimeZone(
                    new Date(body.dateStart),
                    'Europe/Moscow',
                    'yyyy-MM-dd',
                )
            ),
            dateEnd: new Date(
                formatInTimeZone(
                    new Date(body.dateEnd),
                    'Europe/Moscow',
                    'yyyy-MM-dd'
                )
            ),
        });
    }

    @Get('reservations/hotel-room/:roomId')
    async reservationHotelRoom(@Param() params: { roomId: string }) {
        return await this.reservationService
            .getReservations({
                roomId: params.roomId,
            })
            .then((res) =>
                res.map((item) => {
                    return [item.dateStart, item.dateEnd];
                }),
            );
    }

    @Get('/reservations/:id')
    async getReservationClient(@Param() params: { id: string }) {
        return await this.reservationService.getReservations({
            userId: params.id,
        });
    }

    @Delete('/reservations/:id')
    async removeReservation(@Param() params: { id: string }) {
        await this.reservationService.removeReservation(params.id);
    }
}