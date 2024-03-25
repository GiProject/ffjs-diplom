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
import Form from "./Form/Form";
import HotelsList from "./HotelsList/HotelsList";

export default function HotelsPage() {
  return (
    <>
      <Form />
      <HotelsList hotels={[]} />
    </>
  );
}
