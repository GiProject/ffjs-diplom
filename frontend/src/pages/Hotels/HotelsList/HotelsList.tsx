import Body from "@/widgets/Body/Body";
import s from "./HotelsList.module.scss";
import Item from "./Item/Item";
interface HotelsListProps {
  hotels: any[];
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels }) => {
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
};

export default HotelsList;
