import Body from "@/widgets/Body/Body";
import Form from "./Form/Form";

interface RoomAddProps {}

const RoomAdd: React.FC<RoomAddProps> = () => {
  return (
    <div>
      <h1>Добавить номер</h1>
      <Body>
        <Form />
      </Body>
    </div>
  );
};

export default RoomAdd;
