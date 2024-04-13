import Body from "@/widgets/Body/Body";
import Button from "@/shared/ui/Button/Button";
import s from "./Room.module.scss";
import { useAppSelector } from "@/shared/hooks/redux";
import { useRoomDeleteMutation } from "@/shared/redux/api/generalAPI";
interface RoomProps {
  roomDetails: any;
}

const Room: React.FC<RoomProps> = ({ roomDetails }) => {
  const [deleteHotel, { status, data, error }] = useRoomDeleteMutation();

  const handleDelete = () => {
    deleteHotel(roomDetails._id);
  };
  const { userInfo }: any = useAppSelector((state) => state.auth);
  return (
    <Body>
      <article className={s.Room}>
        <div className={s.Image}>
          <img
            src={`${process.env.BASE_URL}${roomDetails.images[0]}`}
            alt={""}
            width={240}
            height={200}
          />
        </div>
        <div className={s.Info}>
          <div className={s.Description}>
            {roomDetails?.description ?? "Описания нет"}
          </div>
          {userInfo?.role === "admin" && (
            <div className={s.Button}>
              <Button href={`/rooms/${roomDetails._id}/edit`}>
                Редактировать
              </Button>
              <Button style="danger" onClick={handleDelete}>
                Удалить
              </Button>
            </div>
          )}
        </div>
      </article>
    </Body>
  );
};

export default Room;
