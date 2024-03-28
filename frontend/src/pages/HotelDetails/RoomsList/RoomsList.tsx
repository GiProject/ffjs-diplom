import Room from "./Room/Room";
import s from "./RoomsList.module.scss";
interface RoomsListProps {
  rooms: any[];
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms }) => {
  if (rooms?.length > 0) {
    return (
      <>
        <h2>Номера</h2>
        <div className={s.RoomsList}>
          {rooms.map((room: any, index: number) => {
            return <Room key={index} roomDetails={room} />;
          })}
        </div>
      </>
    );
  } else {
    return <>Нет номеров</>;
  }
};

export default RoomsList;
