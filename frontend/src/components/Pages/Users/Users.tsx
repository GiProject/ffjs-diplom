import React from "react";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import User from "../../../interfaces/model/user.interface";
import {
  SearchUserParams,
  userData,
} from "../../../interfaces/form/users.search";
import Pagination from "../../UI/Pagination/Pagination";
import Body from "../../General/Body/Body";

axios.defaults.withCredentials = true;
export default function () {
  const options = {
    page: 1,
    perPage: 10,
  };
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(options.page);
  const [count, setCount] = useState(0);
  const userQuery = async (query: SearchUserParams = {}) => {
    query = {
      ...query,
      limit: options.perPage,
      offset: options.perPage * (page - 1),
    };

    return await axios.get(`${process.env.BASE_URL}/api/users`, {
      params: query,
    });
  };

  const searchInputOnChange = (e: ChangeEvent) => {
    // @ts-ignore
    const { value } = e.target;
    setSearch(value);
  };

  const setData = (data: userData) => {
    // @ts-ignore
    setUsers(data.users);
    setCount(data.count);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const userRes = await userQuery({ query: search });

    setPage(1);
    setData(userRes.data);
  };

  useEffect(() => {
    (async () => {
      const usersData = await userQuery({ query: search });

      setData(usersData.data);
    })();
  }, [page]);

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
