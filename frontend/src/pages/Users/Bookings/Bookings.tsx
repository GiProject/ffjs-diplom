import Body from "@/widgets/Body/Body";
import BookingsList from "./BookingsList/BookingsList";
import { useBookingsListQuery } from "@/shared/redux/api/generalAPI";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = () => {
  const { data, isFetching } = useBookingsListQuery("", {
    pollingInterval: 900000,
  });

  return (
    <Body>
      <BookingsList bookings={data ?? []} />
    </Body>
  );
};

export default Bookings;
