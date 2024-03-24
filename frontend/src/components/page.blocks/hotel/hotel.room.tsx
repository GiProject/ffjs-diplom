import {Room} from "../../../interfaces/model/room.interface";
import {Link} from "react-router-dom";

export default function HotelRoom(props: {room: Room}) {

    return <div key={props.room.id} className="room-item">
        <div className="room-image">image</div>
        <div className="room-description">{props.room.title}</div>
        <div className="room-description">{props.room.description}</div>
        <div className="actions">
            <Link to="#" className="button orange update">Редактировать</Link>
        </div>
    </div>
}