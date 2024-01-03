import React, {ChangeEvent, useState} from "react";
import {Calendar} from "primereact/calendar";
import {Form, Formik} from "formik";
import {InputText} from "primereact/inputtext";
import CalendarRange from "./calendar.range";

export default function HotelSearch() {

    const date = new Date;
    const initialState = {
        hotelName: 'example',
        dateIn: date,
        dateOut: date,
    }
    const [values, setValues] = useState(initialState);

    const handleChange = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        setValues(values => ({...values, [name]: value}));
    }

    const calendarChange = (dates: Date[]) => {
        setValues(values => ({
            ...values,
            dateIn: dates[0],
            dateOut: dates[1],
        }));
    }
    const handleSubmit = () => {
        console.log(values);
    }

    return <div>
        <h1>Поиск гостиницы</h1>
        <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}>
            {({
                  values,
                  handleChange
              }) => (
                <div>
                    <div className='errors'></div>
                    <Form>
                        <div className="form-group">
                            <div className="form-input">
                                <InputText
                                    value={values.hotelName}
                                    name="hotelName"
                                    placeholder="Название гостиницы"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-input">
                                <Calendar
                                    value={values.dateIn}
                                    name="dateIn"
                                    dateFormat="dd.mm.yy"
                                    onChange={handleChange}
                                    placeholder="Заезд"
                                />
                            </div>
                            <div className="dash"> -</div>
                            <div className="form-input">
                                <Calendar
                                    value={values.dateOut}
                                    name="dateOut"
                                    dateFormat="dd.mm.yy"
                                    onChange={handleChange}
                                    placeholder="Выезд"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <CalendarRange dateFrom={values.dateIn} dateTo={values.dateOut} onChange={calendarChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Найти</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>

    </div>;
}