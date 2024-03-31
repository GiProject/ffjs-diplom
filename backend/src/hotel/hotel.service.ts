import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Promise} from "mongoose";
import {Hotel, HotelDocument} from './hotel.model';
import {
    FileInterface, HotelCountReturnInterface,
    HotelReturnInterface, HotelRoomReturnInterface,
    ID,
    IHotelService,
    SearchHotelParams,
    UpdateHotelParams, UpdateHotelRoomParams
} from "./hotel.interfaces";
import {saveFile} from "../functions/save.file";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
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

    public async search(params: SearchHotelParams){

        const query = {
            title: {$regex: new RegExp(params.title, "i")},
        };

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
        return this.HotelModel.findOneAndDelete({ _id: id });
    }
}