import { setLoginOpen } from "@/redux/GlobalSlice";
import s from "./User.module.scss";
import { useAppDispatch } from "@/hooks/redux";
interface UserProps {
  isLoggedin?: boolean;
}

const User: React.FC<UserProps> = ({ isLoggedin }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isLoggedin) {
      console.log("User info");
    } else {
      dispatch(setLoginOpen(true));
    }
  };

  if (isLoggedin) {
    return (
      <article className={s.User} onClick={handleClick}>
        Имя пользователя <div className={s.Avatar}></div>
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
