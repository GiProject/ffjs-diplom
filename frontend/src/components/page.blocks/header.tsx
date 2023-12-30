import React from "react";
import {PageProps} from "../../interfaces/page.interface";

export default function Header(props: PageProps) {
    return <div className="header">
        {props.children}
    </div>
}