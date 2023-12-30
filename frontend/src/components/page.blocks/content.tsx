import React from "react";
import {PageProps} from "../../interfaces/page.interface";

export default function Content(props: PageProps) {
    return <div className="content">
        {props.children}
    </div>;
}