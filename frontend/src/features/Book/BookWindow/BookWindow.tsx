import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import ModalWindow from "@/widgets/ModalWindow/ModalWindow";
import { setBookingOpen } from "@/shared/redux/GlobalSlice";
import BookForm from "../BookForm/BookForm";

interface BookWindowProps {}

const BookWindow: React.FC<BookWindowProps> = () => {
  const dispatch = useAppDispatch();
  const isBookingOpen = useAppSelector((state) => state.global.bookingOpen);

  return (
    <ModalWindow
      visible={isBookingOpen ? true : false}
      setVisible={() => {
        dispatch(setBookingOpen(false));
      }}
    >
      <header>
        <h6>Забронировать</h6>
      </header>
      <BookForm
        roomId={typeof isBookingOpen === "string" ? isBookingOpen : ""}
      />
    </ModalWindow>
  );
};

export default BookWindow;
