import s from "./Users.module.scss";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import User from "@/shared/interfaces/model/user.interface";
import {
  SearchUserParams,
  userData,
} from "@/shared/interfaces/form/users.search";
import Pagination from "@/shared/ui/Pagination/Pagination";
import Body from "@/widgets/Body/Body";
import useUsers from "./Users.hook";

axios.defaults.withCredentials = true;
export default function () {
  const { users, count, isLoading } = useUsers();

  return (
    <Body>
      <h1>Пользователи</h1>
      <div className={s.Table}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contactPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Body>
  );
}
