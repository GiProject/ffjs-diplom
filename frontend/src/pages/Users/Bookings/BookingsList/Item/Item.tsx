import moment from "moment";
import s from "./Item.module.scss";
import { Link } from "react-router-dom";
import Button from "@/shared/ui/Button/Button";
import { useBookingDeleteClientMutation } from "@/shared/redux/api/generalAPI";

interface ItemProps {
  bookingDetails: any;
  index: number;
}

const Item: React.FC<ItemProps> = ({ bookingDetails, index }) => {
  const [deleteBooking, { status, data, error }] =
    useBookingDeleteClientMutation();

  const handleDelete = () => {
    deleteBooking(bookingDetails._id);
  };
  return (
    <article className={s.Item}>
      <div>Бронь №{index}:</div>
      <div>
        {bookingDetails.dateStart
          ? moment(bookingDetails.dateStart).format("DD.MM.YYYY")
          : ""}{" "}
        —{" "}
        {bookingDetails.dateEnd
          ? moment(bookingDetails.dateEnd).format("DD.MM.YYYY")
          : ""}
      </div>

      <div>
        <Link to={`/hotels/${bookingDetails.hotelId}`}>Перейти к отелю</Link>
      </div>
      <div className={s.Delete} onClick={handleDelete}>
        Удалить
      </div>
    </article>
  );
};

export default Item;
