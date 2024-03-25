import { FormEvent, useState } from "react";
import axios from "axios";
import Body from "../../General/Body/Body";
import Form from "./Form/Form";

export default function HotelAdd() {
  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    let formData = new FormData(e.target);
    for (let [name, value] of formData) {
      console.log(name, value);
    }
    formData.append("deleteImages", JSON.stringify(deleteImages));
    axios
      .post(`${process.env.BASE_URL}/api/hotels`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Добавить гостиницу</h1>
      <Body>
        <Form />
      </Body>
    </div>
  );
}
