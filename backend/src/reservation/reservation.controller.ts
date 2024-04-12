import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {formatInTimeZone} from 'date-fns-tz';

import {ReservationService} from './reservation.service';
import {ReservationDto, SearchReservationParams} from "./reservatiom.interfaces";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {User} from "../decorations/user.decorator";
import {UserEntity} from "../users/user.entity";
import {ID} from "../hotel/hotel.interfaces";
import {Roles} from "../guards/role.decorator";
import {RoleGuard} from "../guards/role.guard";

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post('client/reservations')
    @Roles('client')
    @UseGuards(RoleGuard)
    async add(
        @User() user: UserEntity,
        @Body() body: any,
    ) {
        return await this.reservationService.addReservation({
            userId: user.id,
            hotelId: body.hotelId,
            roomId: body.roomId,
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
            });
    }


    @Get('manager/reservations/:userId')
    @Roles('manager')
    @UseGuards(RoleGuard)
    async getReservationClient(@Param() params: { userId: ID }) {
        return await this.reservationService.getReservations({
            userId: params.userId,
        });
    }

    @Delete('client/reservations/:id')
    @Roles('client', 'manager')
    @UseGuards(RoleGuard)
    async removeReservation(@Param() params: { id: string }) {
        await this.reservationService.removeReservation(params.id);
    }
}