import React from "react";
import s from "./Header.module.scss";
import User from "./User/User";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <div className={s.Header}>
        <Link to="/" className={s.Logo}>
          <div>LOGO</div>
        </Link>
        <div className={s.Menu}>
          <User isLoggedin={false} />
        </div>
      </div>
    </>
  );
};

export default Header;
