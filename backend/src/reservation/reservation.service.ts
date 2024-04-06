import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Reservation, ReservationDocument} from './reservation.model';
import {ReservationDto, ReservationSearchOptions, IReservation} from './reservatiom.interfaces'

@Injectable()
export class ReservationService implements IReservation {
    constructor(
        @InjectModel(Reservation.name)
        private ReservationModel: Model<ReservationDocument>,
    ) {
    }

    public async addReservation(data: ReservationDto) {
        const checkReservationRoom = this.getReservations({
            roomId: data.roomId.toString(),
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
        });

        if ((await checkReservationRoom).length > 0) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Room is reserved',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return await this.ReservationModel.create({
            userId: data.userId,
            hotelId: data.hotelId,
            roomId: data.roomId,
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
        })
    }

    public async removeReservation(id: string) {
        await this.ReservationModel.findByIdAndDelete(id);
    }

    public async getReservations(
        filter: ReservationSearchOptions,
    ): Promise<Array<Reservation>> {
        // let mongooseFilter = {
        //     roomId: filter.roomId,
        // };

        return this.ReservationModel.find({
            roomId: filter.roomId,
            $and: [
                {
                    dateStart: {
                        $gte: filter.dateStart,
                        $lte: filter.dateEnd,
                    },
                }
            ]
        })
    }
}