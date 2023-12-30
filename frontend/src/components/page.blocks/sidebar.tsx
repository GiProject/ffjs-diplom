import React from "react";
import {PageProps} from "../../interfaces/page.interface";

export default function Sidebar(props: PageProps) {
    return <div className="sidebar">
        {props.children}
    </div>;
}