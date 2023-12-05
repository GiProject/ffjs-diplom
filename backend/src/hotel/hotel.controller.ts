import {Body, Controller, Get, Param, Post, Put, Query, UseInterceptors,} from '@nestjs/common';
import {HotelService} from './hotel.service';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {destination, editFileName} from '../lib/file-upload';
import {ID, UpdateHotelParams, ICreateHotelRoomDto, SearchHotelParams, ICreateHotelDto} from "./hotel.interfaces";

@Controller('api')
export class HotelController {
    constructor(private readonly hotelService: HotelService) {
    }

    @Post('/hotels')
    async create(@Body() CreateHotelDto: ICreateHotelDto) {
        const hotel = await this.hotelService.create(CreateHotelDto);
        return {
            id: hotel._id,
            title: hotel.title,
            description: hotel.description,
        };
    }

    @Get('/hotels')
    async search(@Query() query: SearchHotelParams) {
        const search = await this.hotelService.search(query);

        return search.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            description: item.description,
        }));
    }

    @Get('/hotels/:id')
    async findOne(@Param() params: {
        id: ID
    }) {
        return await this.hotelService.findById(params.id);
    }

    @Put('/hotels/:id')
    @UseInterceptors(
        FilesInterceptor('files', 10, {
            storage: diskStorage({
                destination: destination,
                filename: editFileName,
            }),
        }),
    )
    async putUpdateHotel(@Param() params: {
        id: ID
    }, @Body() body: UpdateHotelParams) {
        await this.hotelService.update(params.id, body);
    }
}