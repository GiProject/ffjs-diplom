import s from "./Users.module.scss";
import axios from "axios";
import User from "@/shared/interfaces/model/user.interface";
import Body from "@/widgets/Body/Body";
import useUsers from "./Users.hook";
import { useAppSelector } from "@/shared/hooks/redux";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;
export default function () {
  const { users, count, isLoading } = useUsers();

  const { userInfo }: any = useAppSelector((state) => state.auth);

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
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              if (userInfo?.role === "manager" && user?.role === "client") {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contactPhone}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link to={`/users/${user._id}`}>Бронирования</Link>
                    </td>
                  </tr>
                );
              }
              if (userInfo?.role === "admin") {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contactPhone}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link to={`/users/${user._id}`}>Бронирования</Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </Body>
  );
}
