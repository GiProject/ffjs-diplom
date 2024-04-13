import { useParams } from "react-router";
import Form from "./Form/Form";
import Body from "@/widgets/Body/Body";
import { useGetRoom } from "../Hotels/Hotels.hook";

interface RoomUpdateProps {}

const RoomUpdate: React.FC<RoomUpdateProps> = () => {
  const params = useParams();
  const roomId = params.id;
  const { room } = useGetRoom(roomId);
  return (
    <div>
      <h1>Комната</h1>
      <Body>{room && <Form room={room} />}</Body>
    </div>
  );
};

export default RoomUpdate;
