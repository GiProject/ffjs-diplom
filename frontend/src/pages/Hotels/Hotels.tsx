import s from "./Hotels.module.scss";
import Form from "./Form/Form";
import HotelsList from "./HotelsList/HotelsList";
import { useGetHotels } from "./Hotels.hook";

export default function HotelsPage() {
  const { hotels, isLoading } = useGetHotels();

  return (
    <div className={s.Hotels}>
      <h1>Поиск гостиницы</h1>
      <Form />
      <HotelsList hotels={hotels} isLoading={isLoading} />
    </div>
  );
}
