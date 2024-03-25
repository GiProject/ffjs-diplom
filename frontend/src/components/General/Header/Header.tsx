import React from "react";
import UserPopover from "./user.modal/user.popover";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="logo-text">logo</div>
      </div>
      <div className="header-profile">
        <UserPopover />
      </div>
    </div>
  );
};

export default Header;
