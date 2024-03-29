import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Promise, Query} from "mongoose";
import {Hotel, HotelDocument} from './hotel.model';
import {
    FileInterface,
    HotelReturnInterface,
    ID,
    IHotelService,
    SearchHotelParams,
    UpdateHotelParams
} from "./hotel.interfaces";
import {writeFile} from "fs";
import {join} from 'path';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
    ) {
    }

    public async create(data: any): Promise<Hotel> {
        data.images = data.images.map((image) => {
            return this.saveFile('hotel', image);
        });
        const hotel = new this.HotelModel(data);

        return await hotel.save();
    }

    public async findById(id: ID): Promise<Hotel> {
        return this.HotelModel.findById(id).select(
            '-__v -createdAt -updatedAt',
        );
    }

    public async search(params: SearchHotelParams): Promise<HotelReturnInterface> {

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
            hotels: hotels,
        };
    }

    public async update(id: ID, data: UpdateHotelParams): Promise<Hotel> {
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
                    images = images.splice(value, 1);
                });
            }

            if (data.images !== undefined) {
                tempImagesPath = data.images.map((image: FileInterface) => {
                    return this.saveFile('hotel', image);
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

    private saveFile(prefix: string, file: FileInterface): String {
        const extension = file.originalname.split('.')[1];
        const imagePath = `/public/images/${prefix}s/${prefix}-${Date.now()}${Math.random()}.${extension}`;
        writeFile(join(__dirname, '..', '..', imagePath), file.buffer, function (err) {
            if (err) {
                return console.log(err);
            }
        });

        return imagePath;
    }
}