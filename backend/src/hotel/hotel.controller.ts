import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles, UseGuards,
    UseInterceptors,
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

    @Put('/hotels/:id')
    @UseInterceptors(FilesInterceptor('images', 6))
    async putUpdateHotel(
        @Param() params: {id: ID},
        @Body() body: UpdateHotelParams,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        body.images = images;

        return await this.hotelService.update(params.id, body);
    }


    @Delete('/hotels/:id')
    async delete(@Param() params: {
        id: ID
    }) {
        return await this.hotelService.delete(params.id);
    }
}