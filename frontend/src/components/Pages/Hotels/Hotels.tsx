import s from "./Hotels.module.scss";
import Form from "./Form/Form";
import HotelsList from "./HotelsList/HotelsList";

export default function HotelsPage() {
  return (
    <div className={s.Hotels}>
      <h1>Поиск гостиницы</h1>
      <Form />
      <HotelsList hotels={[1, 2, 3, 4]} />
    </div>
  );
}
