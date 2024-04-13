import s from "./Hotels.module.scss";
import Form from "./Form/Form";
import HotelsList from "./HotelsList/HotelsList";
import { useGetHotels } from "./Hotels.hook";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function HotelsPage() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { hotels, isLoading, refetch } = useGetHotels({
    dateStart: searchParams.get("startDate") ?? undefined,
    dateEnd: searchParams.get("endDate") ?? undefined,
    title: searchParams.get("title") ?? undefined,
  });

  useEffect(() => {
    setSearchParams({});
  }, []);

  return (
    <div className={s.Hotels}>
      <h1>Поиск гостиницы</h1>
      <Form />
      <HotelsList hotels={hotels} isLoading={isLoading} />
    </div>
  );
}
