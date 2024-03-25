import Body from "../../../../General/Body/Body";
import Button from "../../../../UI/Button/Button";
import s from "./Item.module.scss";
interface ItemProps {
  hotelDetails: any;
}

const Item: React.FC<ItemProps> = ({ hotelDetails }) => {
  return (
    <Body>
      <article className={s.Item}>
        <div className={s.Image}></div>
        <div className={s.Info}>
          <h4>Название отеля</h4>
          <div className={s.Description}>
            Описание отеля описание отеля опис ание отеля описание отеля опис
            ание отеля опис ание отеля опис ание отеля опис ание отеля опис ание
            отеля описа ние отеля опис ание отеля описание отеля описание отеля
          </div>
          <div className={s.Button}>
            <Button>Подробнее</Button>
          </div>
        </div>
      </article>
    </Body>
  );
};

export default Item;
