import {ChangeEvent, FormEvent, useState} from "react";
import * as React from "react";
import * as yup from "yup";
import {ValidationError} from "yup";
import axios from "axios";

export default function RegistrationForm() {
    const initialValues = {
        name: '',
        email: '',
        contactPhone: '',
        password: '',
        resetPassword: '',
    };
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);

    const FormSchema = yup.object({
        name: yup
            .string()
            .required("Поле обязательное"),
        email: yup
            .string()
            .required("Поле обязательное")
            .email("Не корректный email"),
        contactPhone: yup
            .string()
            .required("Поле обязательное")
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})$/g,
                "Не корректный номер телефона"
            ),
        password: yup
            .string()
            .required("Поле обязательное")
            .min(5, "Пароль должен быть больше 5 символов"),
        resetPassword: yup.string()
            .oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let errorMessages = {};

        const validation = await FormSchema
            .validate(values, {abortEarly: false})
            .then(() => {
                axios.post(`${process.env.BASE_URL}/api/users/signup`, values, {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                    .then((res) => {
                        // @ts-ignore
                        e.target.reset();
                        setValues(initialValues);
                        alert('Пользователь успешно зарегистрирован!')
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
    const handleChange = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    return <div className="registration-form-block">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                {errors.name ? (<p className="field-error">{errors.name}</p>) : ''}
                <label htmlFor="name">Имя: </label>
                <input name="name" value={values.name} onChange={handleChange}/>
            </div>
            <div className="form-group">
                {errors.email ? (<p className="field-error">{errors.email}</p>) : ''}
                <label htmlFor="email">Email: </label>
                <input name="email" value={values.email} onChange={handleChange}/>
            </div>
            <div className="form-group">
                {errors.contactPhone ? (<p className="field-error">{errors.contactPhone}</p>) : ''}
                <label htmlFor="contactPhone">Телефон: </label>
                <input name="contactPhone" value={values.contactPhone} onChange={handleChange}/>
            </div>
            <div className="form-group">
                {errors.password ? (<p className="field-error">{errors.password}</p>) : ''}
                <label htmlFor="password">Пароль: </label>
                <input name="password" type="password" value={values.password}
                       onChange={handleChange}/>
            </div>
            {errors.resetPassword ? (<p className="field-error">{errors.resetPassword}</p>) : ''}
            <div className="form-group">
                <label htmlFor="resetPassword">Повторите пароль: </label>
                <input name="resetPassword" type="password" value={values.resetPassword}
                       onChange={handleChange}/>
            </div>
            <div className="form-group">
                <button type="submit">Зарегистрироваться</button>
            </div>
        </form>
    </div>
}