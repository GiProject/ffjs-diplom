import {Calendar} from "primereact/calendar";
// @ts-ignore
import React, {useState} from "react";

interface CalendarDateInterface {
    dateFrom: Date,
    dateTo: Date,
    onChange: Function
}

export default function CalendarRange(props: CalendarDateInterface) {

    const initialDate = [
        props.dateFrom,
        props.dateTo
    ];
    const [dates, setDates] = useState(initialDate);

    const changeDate = (dates: Date[]) => {
        props.onChange(dates);
        setDates(dates);
    }


    return <div>

        <Calendar
            value={dates}
            // @ts-ignore
            onChange={(e) => changeDate(e.value)}
            dateFormat="dd.mm.yy"
            selectionMode="range"
            inline
        />
    </div>
}