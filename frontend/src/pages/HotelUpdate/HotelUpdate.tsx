import Body from "@/widgets/Body/Body";
import Form from "./Form/Form";
import { useParams } from "react-router";
import { useGetHotel } from "../Hotels/Hotels.hook";

export default function HotelUpdate() {
  const params = useParams();
  const hotelId = params.id;
  const { hotel } = useGetHotel(hotelId);

  return (
    <div>
      <h1>Редактировать гостиницу</h1>
      <Body>{hotel && <Form hotel={hotel} />}</Body>
    </div>
  );
}
