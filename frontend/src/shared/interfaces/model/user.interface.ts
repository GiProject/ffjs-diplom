import {string} from "yup";

export default interface User
{
    _id: string,
    name: string,
    email: string,
    contactPhone: string,
}