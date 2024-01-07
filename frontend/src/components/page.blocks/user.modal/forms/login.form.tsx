import * as React from 'react';
import {Field, Form, Formik} from "formik";
import {ChangeEvent, FormEvent, useState} from "react";
import * as yup from "yup";
import axios from "axios";
import {ValidationError} from "yup";

export default function LoginForm() {

    const initialValues = {
        email: '',
        password: '',
    };
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);

    const FormSchema = yup.object({
        email: yup
            .string()
            .required("Поле обязательное")
            .email("Не корректный email"),
        password: yup
            .string()
            .required("Поле обязательное")
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let errorMessages = {};

        const validation = await FormSchema
            .validate(values, {abortEarly: false})
            .then(() => {
                axios.post(`${process.env.BASE_URL}/api/users/login`, values, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true
                })
                    .then((res) => {
                        // @ts-ignore
                        e.target.reset();
                        setValues(initialValues);
                        alert('Вы успешно авторизованы!')
                    })
                    .catch((e) => {
                        alert('Ошибка!')
                    })
            }).catch((e) => {
                return e
            })

        setErrors(initialValues)

        if (validation) {
            validation.inner.map((error: ValidationError) => {
                // @ts-ignore
                errorMessages[error.path] = error.message;
            })

            setErrors(errors => ({...errors, ...errorMessages}))
        }
    }
    const handleChanged = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        setValues(values => ({...values, [name]: value}));
    }

    return <form onSubmit={handleSubmit}>
        <div className="form-group">
            {errors.email ? (<p className="field-error">{errors.email}</p>) : ''}
            <input name="email" value={values.email} onChange={handleChanged}/>
        </div>
        <div className="form-group">
            {errors.password ? (<p className="field-error">{errors.password}</p>) : ''}
            <input name="password" type="password" value={values.password} onChange={handleChanged}/>
        </div>
        <div className="form-group">
            <button type="submit">Войти</button>
        </div>
    </form>
};