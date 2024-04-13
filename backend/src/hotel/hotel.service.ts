import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Hotel, HotelDocument} from './hotel.model';
import {
    FileInterface,
    ID,
    IHotelService,
    SearchHotelParams, SearchHotelQuery,
    UpdateHotelRoomParams
} from "./hotel.interfaces";
import {saveFile} from "../functions/save.file";
import {Reservation, ReservationDocument} from "../reservation/reservation.model";
import {HotelRoom, HotelRoomDocument} from "../hotelRoom/hotel.room.model";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
        @InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
        @InjectModel(HotelRoom.name) private HotelRoomModel: Model<HotelRoomDocument>,
    ) {
    }

    public async create(data: any): Promise<Hotel> {
        data.images = data.images.map((image) => {
            return saveFile('hotel', image);
        });
        const hotel = new this.HotelModel(data);

        return await hotel.save();
    }

    public async findById(id: ID): Promise<Hotel> {
        return this.HotelModel
            .findById(id)
            .select('-__v -createdAt -updatedAt');
    }

    public async search(params: SearchHotelParams) {

        let query: SearchHotelQuery = {};

        if (params.title) {
            query.title = {$regex: new RegExp(params.title, "i")};
        }


        if (params.isFree) {
            const reservations = await this.ReservationModel.find({
                dateStart: {
                    $gte: params.dateStart,
                    $lte: params.dateEnd
                },
                dateEnd: {
                    $lte: params.dateEnd,
                    $gte: params.dateStart
                }
            }).select('roomId').exec();

            const notReservedRooms = await this.HotelRoomModel.find({
                _id: {
                    $nin: reservations.map(reservation => reservation.roomId)
                }
            }).select('hotel').exec()

            query._id = {
                $in: notReservedRooms.map(room => room.hotel._id)
            }
        }

        const count = await this.HotelModel.find(query).countDocuments().exec();
        const hotels = await this.HotelModel.find(query)
            .skip(params.offset)
            .limit(params.limit)
            .select('-__v -createdAt -updatedAt');

        return {
            count: count,
            data: hotels,
        };
    }

    public async update(id: ID, data: UpdateHotelRoomParams): Promise<Hotel> {
        let resultImages;
        const hotel = await this.HotelModel.findById(id).select(
            '-__v -createdAt -updatedAt',
        );

        if (hotel === null) {
            return null;
        }

        let images = [...hotel?.images];

        if (data.delete_image !== undefined || data.images !== undefined) {
            let tempImagesPath = [];
            if (data.delete_image !== undefined) {
                data.delete_image.forEach((value) => {
                    images.splice(value, 1);
                });
            }

            if (data.images !== undefined) {
                tempImagesPath = data.images.map((image: FileInterface) => {
                    return saveFile('hotel', image);
                });

            }
            resultImages = [...images, ...tempImagesPath];
        } else {
            resultImages = [...images];
        }

        return this.HotelModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    title: data.title,
                    description: data.description,
                    images: resultImages,
                    updatedAt: new Date(),
                },
            },
            {
                new: true,
            },
        );
    }

    public async delete(id: ID) {
        return this.HotelModel.findOneAndDelete({_id: id});
    }
}