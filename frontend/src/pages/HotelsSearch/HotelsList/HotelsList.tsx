import Body from "@/widgets/Body/Body";
import s from "./HotelsList.module.scss";
import Item from "./Item/Item";
interface HotelsListProps {
  hotels: any[];
  isLoading?: boolean;
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels, isLoading }) => {
  if (!isLoading) {
    if (hotels?.length > 0) {
      return (
        <div className={s.HotelsList}>
          {hotels.map((hotel: any, index) => {
            return (
              <Body key={index}>
                <Item hotelDetails={hotel} />
              </Body>
            );
          })}
        </div>
      );
    } else {
      return <>Отели не найдены</>;
    }
  } else {
    return <>Загрузка...</>;
  }
};

export default HotelsList;
