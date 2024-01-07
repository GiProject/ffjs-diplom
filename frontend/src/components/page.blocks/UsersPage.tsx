import axios from "axios";
import {useEffect, useState} from "react";
import User from "../../interfaces/model/user.interface";

axios.defaults.withCredentials = true;
export default function () {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const usersList = await axios.get(`${process.env.BASE_URL}/api/users`);
            setUsers(usersList.data);
        })();
    }, []);


    return <div>
        {users.map((user: User) => (
            <div className="user-list-item" key={user._id}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.contactPhone}</div>
            </div>
        ))}
    </div>
}