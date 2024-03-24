import ImageInput from "./file.input";
import ImagesList from "./form.images.list";
import {ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState} from "react";
import axios from "axios";

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
        formData.append('deleteImages', JSON.stringify(deleteImages));
        axios.post(`${process.env.BASE_URL}/api/hotels`, formData)
            .then((res => console.log(res)))
            .catch(err => console.log(err));

    }

    // const deleteImage = (e: any) => {
    //     const parentElement = e.target.parentElement
    //     const elementIndex = parentElement.getAttribute('data-key');
    //     // @ts-ignore
    //     setDeleteImages([...deleteImages, elementIndex]);
    //     parentElement?.remove();
    // }

    return <div className="hotel-add">
        <form onSubmit={handleSubmit}>
            <div className="images">
                <div className="images-list">
                    {(images.map((image, key) =>
                        <ImageInput
                            newImage={(e: ChangeEventHandler) => {
                                // @ts-ignore
                                setImages([...images, e.target.files[0]]);
                            }}
                            index={key}
                            image={image}
                            // deleteImage={deleteImage}
                        />
                    ))}
                    <ImageInput
                        newImage={(e: ChangeEventHandler) => {
                            // @ts-ignore
                            setImages([...images, e.target.files[0]]);
                        }}
                    />
                </div>

            </div>
            <div className="form-group">
                <div style={{width: '100%'}}>
                    <label htmlFor="title">Название отеля</label>
                    <input name="title" type="text"/>
                </div>
            </div>
            <div className="form-group">
                <div style={{width: '100%'}}>
                <label htmlFor="description">Описание отеля</label>
                    <textarea name="description"/>
                </div>
            </div>
            <div className="form-group">
                <button type="submit">Сохранить</button>
            </div>
        </form>
    </div>
}