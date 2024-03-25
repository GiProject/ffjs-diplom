import s from "./HotelsList.module.scss";
import Item from "./Item/Item";
interface HotelsListProps {
  hotels: any[];
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels }) => {
  if (hotels?.length > 0) {
    return (
      <div className={s.HotelsList}>
        {hotels.map((hotel: any) => {
          return <Item key={hotel.id} hotelDetails={hotel} />;
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default HotelsList;
