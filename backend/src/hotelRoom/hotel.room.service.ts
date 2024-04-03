import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {
    FileInterface,
    ID,
    IHotelRoomService,
    SearchRoomsParams, UpdateHotelRoomParams
} from '../hotel/hotel.interfaces';
import {HotelRoom, HotelRoomDocument} from './hotel.room.model';
import {saveFile} from "../functions/save.file";

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name)
        private HotelRoomModel: Model<HotelRoomDocument>,
    ) {}

    public async create(data: any): Promise<HotelRoom> {
        data.images = data.images.map((image) => {
            return saveFile('hotel-rooms', image);
        });

        const hotelRoom = new this.HotelRoomModel(data);
        return hotelRoom.save();
    }

    public async findById(id: ID): Promise<HotelRoom> {
        return this.HotelRoomModel.findById(id)
            .select('-__v -createdAt -updatedAt')
    }

    async search(params: SearchRoomsParams){
        if (params.isEnabled === undefined) {
            delete params.isEnabled;
        }
        const count = await this.HotelRoomModel.find(params).countDocuments().exec();
        const rooms = await this.HotelRoomModel.find(params)
            .populate("hotel")
            .select("-__v")
            .exec();

        return {
            count: count,
            data: rooms,
        };
    }


    public async update(
        id: ID,
        data: UpdateHotelRoomParams,
    ): Promise<HotelRoom> {
        let resultImages;
        const hotelRoom = await this.HotelRoomModel.findById(id).select(
            '-__v -createdAt -updatedAt',
        );

        if (hotelRoom === null) {
            return null;
        }

        let images = [...hotelRoom?.images];

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

        return this.HotelRoomModel.findOneAndUpdate(
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
        return this.HotelRoomModel.findOneAndDelete({ _id: id });
    }

}