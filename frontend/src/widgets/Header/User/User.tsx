import { setLoginOpen } from "@/shared/redux/GlobalSlice";
import s from "./User.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { userToken }: any = useAppSelector((state) => state.auth);

  const handleClick = () => {
    if (userToken) {
      console.log("User info");
    } else {
      dispatch(setLoginOpen(true));
    }
  };

  if (userToken) {
    return (
      <article className={s.User} onClick={handleClick}>
        Авторизован <div className={s.Avatar}></div>
      </article>
    );
  } else {
    return (
      <article className={s.User} onClick={handleClick}>
        Войти
      </article>
    );
  }
};

export default User;
