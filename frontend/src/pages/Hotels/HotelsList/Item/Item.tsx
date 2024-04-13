import Button from "@/shared/ui/Button/Button";
import s from "./Item.module.scss";
import { useAppSelector } from "@/shared/hooks/redux";
import { useHotelDeleteMutation } from "@/shared/redux/api/generalAPI";
interface ItemProps {
  hotelDetails: any;
}

const Item: React.FC<ItemProps> = ({ hotelDetails }) => {
  const { userInfo }: any = useAppSelector((state) => state.auth);
  const [deleteHotel, { status, data, error }] = useHotelDeleteMutation();

  const handleDelete = () => {
    deleteHotel(hotelDetails._id);
  };

  return (
    <article className={s.Item}>
      <div className={s.Image}>
        <img
          src={`${process.env.BASE_URL}${hotelDetails.images[0]}`}
          alt={hotelDetails.title}
          width={240}
          height={200}
        />
      </div>
      <div className={s.Info}>
        <h4>{hotelDetails.title}</h4>
        <div className={s.Description}>{hotelDetails.description}</div>
        <div className={s.Button}>
          <Button href={`/hotels/${hotelDetails._id}`}>Подробнее</Button>
          {userInfo?.role === "admin" && (
            <Button style="danger" onClick={handleDelete}>
              Удалить
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Item;
