import React from "react";
import s from "./Header.module.scss";
import User from "./User/User";
import { Link } from "react-router-dom";
import Container from "@/shared/components/Container/Container";
import SignInWindow from "@/features/SignIn/SignInWindow/SignInWindow";
import SignUpWindow from "@/features/SignUp/SignInWindow/SignUpWindow";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <header className={s.HeaderContainer}>
        <Container>
          <div className={s.Header}>
            <Link to="/" className={s.Logo}>
              <div>LOGO</div>
            </Link>
            <div className={s.Menu}>
              <User />
            </div>
          </div>
        </Container>
      </header>

      <>
        <SignInWindow />
        <SignUpWindow />
      </>
    </>
  );
};

export default Header;
