import HotelFormInput from "../../../interfaces/form/hotel.form.input";

export default function ImageInput(props: HotelFormInput)
{
    return <div className="add-image-input">
        {props.image && props.index !== undefined ? (
            <div
                data-key = {props.index}
                key={props.index + 1}>
                <div className="delete-image" onClick={props.deleteImage}>x</div>
                <div className="form-preview-img"
                     style={{backgroundImage: `url(${URL.createObjectURL(props.image)})`}}>
                </div>
            </div>
        ) : <label>
            <span>+</span>
            <input type="file" onChange={props.newImage} name="images[]" className="hidden"/>
        </label>}
    </div>
}