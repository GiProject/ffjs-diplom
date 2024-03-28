import Body from "@/widgets/Body/Body";
import Button from "@/shared/ui/Button/Button";
import s from "./Room.module.scss";
interface RoomProps {
  roomDetails: any;
}

const Room: React.FC<RoomProps> = ({ roomDetails }) => {
  return (
    <Body>
      <article className={s.Room}>
        <div className={s.Image}></div>
        <div className={s.Info}>
          <h4>Название номера</h4>
          <div className={s.Description}>
            Описание номера описание номера опис ание номера описание номера
            опис ание номера опис ание номера опис ание номера опис ание номера
            опис ание номера описа ние номера опис ание номера описание номера
            описание номера
          </div>
          <div className={s.Button}>
            <Button>Редактировать</Button>
          </div>
        </div>
      </article>
    </Body>
  );
};

export default Room;
