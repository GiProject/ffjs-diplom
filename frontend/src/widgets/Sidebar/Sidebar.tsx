import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Sidebar.module.scss";
import { useAppSelector } from "@/shared/hooks/redux";

const nav_items = [
  {
    name: "Все гостиницы",
    link: "/hotels",
  },
  {
    name: "Поиск номера",
    link: "/search",
  },
  {
    name: "Мои бронирования",
    link: "/bookings",
    only: "client",
  },
  {
    name: "Добавить гостиницу",
    link: "/hotels/add",
    only: "admin",
  },
  {
    name: "Пользователи",
    link: "/users",
    only: "admin",
  },
];

export default function Sidebar() {
  const { userInfo }: any = useAppSelector((state) => state.auth);
  return (
    <div className={s.SidebarContainer}>
      <div className={s.Sidebar}>
        <nav>
          {nav_items.map((item) => {
            if (item.only && userInfo?.role !== item.only) return null;
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
