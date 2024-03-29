import s from "./HotelDetails.module.scss";
import { useParams } from "react-router";

import Button from "@/shared/ui/Button/Button";
import Body from "@/widgets/Body/Body";
import RoomsList from "./RoomsList/RoomsList";
import ScrollToTop from "@/shared/utils/scrollToTop";
import { useGetHotel } from "../Hotels/Hotels.hook";

export default function HotelDetail() {
  const params = useParams();
  const hotelId = params.id;
  const { hotel } = useGetHotel(hotelId);

  return (
    <div className={s.HotelDetails}>
      <h1>{hotel?.title}</h1>
      <Body>
        <article className={s.Item}>
          <div className={s.ImagesList}>
            {hotel?.images.map((image: string, index: number) => {
              return (
                <div className={s.Image} key={index}>
                  <img
                    src={`${process.env.BASE_URL}${image}`}
                    alt={hotel?.title}
                  />
                </div>
              );
            })}
          </div>
          <div className={s.Info}>
            <div className={s.Description}>{hotel?.description}</div>
          </div>
        </article>
      </Body>

      <Body>
        <div className={s.Actions}>
          <Button href={`/hotels/${hotelId}/update`}>Редактировать</Button>
          <Button href={`/hotels/${hotelId}/addRoom`}>Добавить номер</Button>
        </div>
      </Body>
      <RoomsList rooms={[1, 2, 3]} />
      <ScrollToTop />
    </div>
  );
}
