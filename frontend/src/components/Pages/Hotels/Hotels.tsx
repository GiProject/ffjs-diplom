import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../UI/Pagination/Pagination";
import {
  Hotel,
  hotelData,
  HotelSearchParams,
} from "../../../interfaces/model/hotel.interface";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";

export default function HotelsPage() {
  const options = {
    page: 1,
    perPage: 10,
  };
  const date = new Date();
  const searchInitialState = {
    title: "",
    dateIn: date,
    dateOut: date,
  };
  const [values, setValues] = useState(searchInitialState);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(options.page);
  const [count, setCount] = useState(0);
  const hotelQuery = async (query: HotelSearchParams) => {
    query = {
      ...query,
      limit: options.perPage,
      offset: options.perPage * (page - 1),
    };

    return await axios.get(`${process.env.BASE_URL}/api/hotels`, {
      params: query,
    });
  };

  const searchInputOnChange = (e: ChangeEvent) => {
    // @ts-ignore
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const setData = (data: hotelData) => {
    // @ts-ignore
    setHotels(data.hotels);
    setCount(data.count);
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const hotelRes = await hotelQuery(values);

    setPage(1);
    setData(hotelRes.data);
  };

  useEffect(() => {
    (async () => {
      const hotelRes = await hotelQuery(values);

      setData(hotelRes.data);
    })();
  }, [page]);

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <div className="form-input">
            <InputText
              value={values.title}
              name="hotelName"
              placeholder="Название гостиницы"
              onChange={searchInputOnChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-input">
            <Calendar
              value={values.dateIn}
              name="dateIn"
              dateFormat="dd.mm.yy"
              onChange={searchInputOnChange}
              placeholder="Заезд"
            />
          </div>
          <div className="dash"> -</div>
          <div className="form-input">
            <Calendar
              value={values.dateOut}
              name="dateOut"
              dateFormat="dd.mm.yy"
              onChange={searchInputOnChange}
              placeholder="Выезд"
            />
          </div>
        </div>
      </form>
      <div className="block">
        {hotels.map((hotel: Hotel) => (
          <div className="hotel-item" key={hotel._id}>
            <div className="hotel-image"></div>
            <div className="hotel-content">
              <div className="hotel-td">
                <div className="hotel-title">{hotel.title}</div>
                <div className="hotel-desc">{hotel.description}</div>
              </div>
              <div className="hotel-link">
                <Link to={`/hotels/${hotel._id}`}>Подробнее</Link>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          count={count}
          perPage={options.perPage}
          currentPage={page}
          nextPage={(page: number) => setPage(page)}
        />
      </div>
    </div>
  );
}
