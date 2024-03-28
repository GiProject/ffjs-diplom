import React from "react";
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

  const options = {
    page: 1,
    perPage: 10,
  };
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(options.page);

  const searchInputOnChange = (e: ChangeEvent) => {
    // @ts-ignore
    const { value } = e.target;
    setSearch(value);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setPage(1);
  };

  return (
    <Body>
      <form onSubmit={onSubmitHandler}>
        <input
          name="user-search"
          value={search}
          placeholder="Поиск пользователей: Имя, телефон или email"
          onChange={searchInputOnChange}
        />
      </form>
      <div className="block-table">
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

        <Pagination
          count={count}
          perPage={options.perPage}
          currentPage={page}
          nextPage={(page: number) => setPage(page)}
        />
      </div>
    </Body>
  );
}
