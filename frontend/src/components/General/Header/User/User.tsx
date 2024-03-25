import s from "./User.module.scss";
interface UserProps {
  isLoggedin?: boolean;
}

const User: React.FC<UserProps> = ({ isLoggedin }) => {
  if (isLoggedin) {
    return (
      <article className={s.User}>
        Имя пользователя <div className={s.Avatar}></div>
      </article>
    );
  } else {
    return <article className={s.User}>Войти</article>;
  }
};

export default User;
