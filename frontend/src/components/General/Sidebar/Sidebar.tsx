import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Sidebar.module.scss";

const nav_items = [
  {
    name: "Все гостиницы",
    link: "/hotels",
  },
  {
    name: "Поиск номера",
    link: "/drift",
  },
  {
    name: "Добавить гостиницу",
    link: "/hotels/add",
  },
  {
    name: "Пользователи",
    link: "/users",
  },
];

export default function Sidebar() {
  return (
    <div className={s.SidebarContainer}>
      <div className={s.Sidebar}>
        <nav>
          {nav_items.map((item) => {
            return (
              <NavLink
                key={item.link + item.name}
                className="menu__item"
                to={item.link}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
