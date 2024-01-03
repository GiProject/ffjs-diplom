import * as React from 'react';
import {Field, Form, Formik} from "formik";
import {ChangeEvent, useState} from "react";

export default function LoginForm() {

    const initialValues = {
        login: '',
        password: '',
    };
    const [values, setValues] = useState(initialValues);
    const handleSubmit = () => {
        console.log(values);
    }
    const handleChanged = (e: ChangeEvent) => {
        // @ts-ignore
        const {name, value} = e.target;
        setValues(values => ({...values, [name]: value}));
    }

    return <>
        <Formik
            onSubmit={handleSubmit}
            initialValues={values}>
            {({
                  values,
                  handleChange
              }) => (
                  <Form>
                      <Field name="login" value={values.login} onChange={(e: ChangeEvent) => { handleChange(e); handleChanged(e) }} />
                      <Field name="password" type="password" value={values.password} onChange={(e: ChangeEvent) => { handleChange(e); handleChanged(e) }} />
                      <input type="submit" value="Войти"/>
                  </Form>
            )}
        </Formik>
    </>
};