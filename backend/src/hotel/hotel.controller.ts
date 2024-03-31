import {
    Body,
    Controller, Delete,
    Get, HttpException,
    Param, Patch,
    Post,
    Query, Res,
    UploadedFiles, UseGuards,
    UseInterceptors,
    HttpStatus,
} from '@nestjs/common';
import {HotelService} from './hotel.service';
import {FilesInterceptor} from '@nestjs/platform-express';
import {ID, UpdateHotelParams, ICreateHotelRoomDto, SearchHotelParams, ICreateHotelDto} from "./hotel.interfaces";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('api')
@UseGuards(JwtAuthGuard)
export class HotelController {
    constructor(private readonly hotelService: HotelService) {
    }


    @Post('/hotels')
    @UseInterceptors(FilesInterceptor('images', 6))
    async create(
        @UploadedFiles() images: Array<Express.Multer.File>,
        @Body() createHotelDto: ICreateHotelDto,
    ) {
        const data = {...createHotelDto, images: images}
        const hotel = await this.hotelService.create(data);
        return {
            id: hotel._id,
            title: hotel.title,
            description: hotel.description,
            images: hotel.images,
        };
    }

    @Get('/hotels')
    async search(@Query() query: SearchHotelParams) {
        return await this.hotelService.search(query);
    }

    @Get('/hotels/:id')
    async findOne(@Param() params: {
        id: ID
    }) {
        return await this.hotelService.findById(params.id);
    }

    @Patch('/hotels/:id')
    @UseInterceptors(FilesInterceptor('images', 6))
    async updateHotel(
        @Param() params: {id: ID},
        @Body() body: UpdateHotelParams,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        if (images !== undefined) {
            body.images = images;
        }
        const result = await this.hotelService.update(params.id, body);

        if (result === null) {
            throw new HttpException('Отель не найден', HttpStatus.NOT_FOUND);
        }

        return result;
    }


    @Delete('/hotels/:id')
    async delete(@Param() params: {
        id: ID
    }) {
        return await this.hotelService.delete(params.id);
    }
}