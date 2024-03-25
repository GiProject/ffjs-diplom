import React from "react";
import s from "./Header.module.scss";
import User from "./User/User";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={s.Header}>
      <div className={s.Logo}>
        <div>LOGO</div>
      </div>
      <div className={s.Menu}>
        <User isLoggedin={true} />
      </div>
    </div>
  );
};

export default Header;
