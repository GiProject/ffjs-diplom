import s from "./Item.module.scss";
interface ItemProps {
  hotelDetails: any;
}

const Item: React.FC<ItemProps> = ({ hotelDetails }) => {
  return <article className={s.Item}></article>;
};

export default Item;
