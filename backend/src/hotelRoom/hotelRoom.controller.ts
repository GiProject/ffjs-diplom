import {
  Body,
  Controller, Delete,
  Get,
  HttpException, HttpStatus,
  Param, Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { HotelRoomService } from "./hotel.room.service";

import { HotelService } from "../hotel/hotel.service";
import {
  ICreateHotelRoomDto,
  ID, SearchRoomsParams, UpdateHotelParams, UpdateHotelRoomParams,
} from "../hotel/hotel.interfaces";

@Controller("api")
export class HotelRoomController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService
  ) {
  }

  @Get("/hotels-rooms")
  async searchRooms(@Query() query: SearchRoomsParams) {
    return await this.hotelRoomService.search(query);
  }

  @Post("/hotels/:hotelId/rooms")
  @UseInterceptors(FilesInterceptor('images', 6))
  async create(
    @Param() params: {
      hotelId: ID
    },
    @Body() body: ICreateHotelRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {

    const hotel = await this.hotelService.findById(params.hotelId);
    if (hotel === null) {
      throw new HttpException('Отель не найден', HttpStatus.NOT_FOUND);
    }

    const data = {...body, images: images, hotel: hotel}

    const result = await this.hotelRoomService.create(data);

    if (result === null) {
      throw new HttpException('Отель не найден', HttpStatus.NOT_FOUND);
    }

    return {
      id: result._id.toString(),
      description: result.description,
      images: result.images,
      isEnabled: result.isEnabled,
      hotel: result.hotel
    };
  }

  @Get('/hotels/rooms/:id')
  async findOne(@Param() params: {
    id: ID
  }) {
    return await this.hotelRoomService.findById(params.id).then(hotelRoom => {
      if (hotelRoom === null) {
        throw new HttpException('Комната не найдена', HttpStatus.NOT_FOUND);
      }

      return hotelRoom;
    });
  }

  @Patch('/hotels/rooms/:id')
  @UseInterceptors(FilesInterceptor('images', 6))
  async updateHotelRoom(
      @Param() params: {id: ID},
      @Body() body: UpdateHotelRoomParams,
      @UploadedFiles() images: Array<Express.Multer.File>
  ) {
    if (images !== undefined) {
      body.images = images;
    }
    const result = await this.hotelRoomService.update(params.id, body);

    if (result === null) {
      throw new HttpException('Комната не найдена', HttpStatus.NOT_FOUND);
    }

    return result;
  }


  @Delete('/hotels/rooms/:id')
  async delete(@Param() params: {
    id: ID
  }) {
    return await this.hotelRoomService.delete(params.id);
  }
}