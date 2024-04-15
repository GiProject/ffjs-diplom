import { Link } from "react-router-dom";
import s from "./BookingsList.module.scss";
import Item from "./Item/Item";
interface BookingsListProps {
  bookings: any[];
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings }) => {
  return (
    <div className={s.BookingsList}>
      {bookings.length > 0 ? (
        bookings.map((booking: any, index: number) => {
          return (
            <Item key={index} bookingDetails={booking} index={index + 1} />
          );
        })
      ) : (
        <>
          <p>Нет забронированных номеров</p>
        </>
      )}
    </div>
  );
};

export default BookingsList;
