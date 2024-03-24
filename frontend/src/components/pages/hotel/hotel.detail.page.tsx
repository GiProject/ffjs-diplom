import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {Room} from "../../../interfaces/model/room.interface";
import {Link} from "react-router-dom";
import HotelRoom from "../../page.blocks/hotel/hotel.room";

export default function HotelDetail() {
    const params = useParams();
    const hotelId = params.id;
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([])

    const hotelQuery = async (id: string | undefined) => {
        return await axios.get(`${process.env.BASE_URL}/api/hotels/${id}`, {})
    }
    const roomsQuery = async (hotelId: string | undefined) => {
        return await axios.get(`${process.env.BASE_URL}/api/hotels-rooms/`, {
            params: {
                hotel: hotelId
            }
        })
    }

    useEffect(() => {
        //получаем данные определенной гостиницы
        (async () => {
            const resHotel = await hotelQuery(hotelId);
            setHotel(resHotel.data);
            const resRooms = await roomsQuery(hotelId);
            setRooms(resRooms.data);
        })()
    }, []);

    return <div className="hotel-detail">
        <div className="hotel-images">
            images
        </div>
        <div className="hotel-title">
            {hotel.title}
        </div>
        <div className="hotel-description">
            {hotel.description}
        </div>
        <div className="hotel-actions">
            <Link to="#" className="button orange update">Редактировать</Link>
            <Link to="#" className="button blue add-room">Добавить номер</Link>
        </div>
        <div className="rooms">
            {rooms.map((room: Room) => <HotelRoom room={room} />)}
        </div>
    </div>
}