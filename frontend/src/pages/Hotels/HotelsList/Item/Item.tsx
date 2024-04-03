import { Link } from "react-router-dom";
import Button from "@/shared/ui/Button/Button";
import s from "./Item.module.scss";
interface ItemProps {
  hotelDetails: any;
}

const Item: React.FC<ItemProps> = ({ hotelDetails }) => {
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
        </div>
      </div>
    </article>
  );
};

export default Item;
