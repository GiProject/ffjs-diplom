import React from "react";
import {NavLink} from "react-router-dom";

export  default function Navigation() {
    return <React.Fragment>
        <nav className="menu">
            <NavLink className="menu__item" to="/">Все гостиницы</NavLink>
            <NavLink className="menu__item" to="/drift">Поиск номера</NavLink>
            <NavLink className="menu__item" to="/timeattack">Добавить гостиницу</NavLink>
            <NavLink className="menu__item" to="/users">Пользователи</NavLink>
        </nav>
    </React.Fragment>
}
