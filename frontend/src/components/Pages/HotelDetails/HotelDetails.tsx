import s from "./HotelDetails.module.scss";

import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { Room } from "../../../interfaces/model/room.interface";
import HotelRoom from "./RoomsList/Room/Room";
import Button from "../../UI/Button/Button";
import Body from "../../General/Body/Body";
import RoomsList from "./RoomsList/RoomsList";

export default function HotelDetail() {
  const params = useParams();
  const hotelId = params.id;
  const [hotel, setHotel] = useState<any>({});
  const [rooms, setRooms] = useState<any>([]);

  const hotelQuery = async (id: string | undefined) => {
    return await axios.get(`${process.env.BASE_URL}/api/hotels/${id}`, {});
  };
  const roomsQuery = async (hotelId: string | undefined) => {
    return await axios.get(`${process.env.BASE_URL}/api/hotels-rooms/`, {
      params: {
        hotel: hotelId,
      },
    });
  };

  useEffect(() => {
    //получаем данные определенной гостиницы
    (async () => {
      const resHotel = await hotelQuery(hotelId);
      setHotel(resHotel.data);
      const resRooms = await roomsQuery(hotelId);
      setRooms(resRooms.data);
    })();
  }, []);

  return (
    <div className={s.HotelDetails}>
      <h1>Отель ID: {hotelId}</h1>
      <Body>
        <article className={s.Item}>
          <div className={s.ImagesList}>
            <div className={s.Image}></div>
            <div className={s.Image}></div>
          </div>
          <div className={s.Info}>
            <div className={s.Description}>
              Описание отеля описание отеля опис ание отеля описание отеля опис
              ание отеля опис ание отеля опис ание отеля опис ание отеля опис
              ание отеля описа ние отеля опис ание отеля описание отеля описание
              отеля
            </div>
          </div>
        </article>
      </Body>

      <Body>
        <div className={s.Actions}>
          <Button>Редактировать</Button>
          <Button>Добавить номер</Button>
        </div>
      </Body>
      <RoomsList rooms={[1, 2, 3]} />
    </div>
  );
}
