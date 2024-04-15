import s from "./User.module.scss";

import { setLoginOpen } from "@/shared/redux/GlobalSlice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { useState } from "react";
import UserWindow from "./UserWindow/UserWindow";

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { userToken, userInfo }: any = useAppSelector((state) => state.auth);

  //User Window
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (userToken) {
      setOpen(true);
    } else {
      dispatch(setLoginOpen(true));
    }
  };

  if (userToken) {
    return (
      <>
        <article className={s.User} onClick={handleClick}>
          {userInfo?.name ? userInfo.name : userInfo?.email}{" "}
          <div className={s.Avatar}></div>
        </article>
        <UserWindow open={open} setOpen={setOpen} />
      </>
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
