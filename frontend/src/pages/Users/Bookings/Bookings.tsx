import Body from "@/widgets/Body/Body";
import BookingsList from "./BookingsList/BookingsList";
import { useBookingsListManagerQuery } from "@/shared/redux/api/generalAPI";
import { useParams } from "react-router";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = () => {
  const params = useParams();
  const userId = params.id;
  const { data, isFetching } = useBookingsListManagerQuery(userId);

  return (
    <Body>
      <BookingsList bookings={data ?? []} />
    </Body>
  );
};

export default Bookings;
