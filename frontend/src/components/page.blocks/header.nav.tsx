import React from "react";
import UserPopover from "./user.modal/user.popover";

export  default function HeaderNav() {
    return <div className="header-profile">
        <UserPopover />
    </div>;
}
