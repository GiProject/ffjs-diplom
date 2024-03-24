import React, {ChangeEvent, FormEvent, useState} from "react";
import * as yup from "yup";
import {ValidationError} from "yup";

export default function Test() {

    const [values, setValues] = useState({name:'name'})
    const [errors, setErrors] = useState({});

    const handleChange = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        setValues(values => ({...values, [name]: value}));
    }

    const FormSchema = yup.object({
        name: yup
            .string()
            .required("Поле обязательное")
    });

    const onSubmit = async (e:FormEvent) => {
        e.preventDefault()
        let errorMessages = {};

        const validation = await FormSchema
           .validate(values, { abortEarly: false })
           .then(() => {
               console.log('then')
           }).catch((e) => {
               return e
           })

        if (validation) {
            validation.inner.map((error: ValidationError) => {
                // @ts-ignore
                errorMessages[error.path] = error.message;
            })

            setErrors(errors => ({...errors, ...errorMessages}))
        } else {
            setErrors({})
        }

    }

    // @ts-ignore
    return <></>;
}