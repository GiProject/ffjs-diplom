import s from "./HotelDetails.module.scss";
import { useParams } from "react-router";

import Button from "@/components/UI/Button/Button";
import Body from "@/components/General/Body/Body";
import RoomsList from "./RoomsList/RoomsList";
import ScrollToTop from "@/utils/scrollToTop";

export default function HotelDetail() {
  const params = useParams();
  const hotelId = params.id;

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
      <ScrollToTop />
    </div>
  );
}
