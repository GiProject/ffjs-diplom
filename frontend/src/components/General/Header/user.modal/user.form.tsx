import React from "react";
import LoginForm from "../../../Pages/SignIn/SignInForm/SignInForm";

export default function UserForm() {
  //тут должна быть форма, в зависимости от состояния пользователя,
  //если это пользователь без авторизации, то форма авторизации и ссылка на регистрацию
  //если пользователь авторизован, то показывать информацию о пользователе

  return (
    <>
      <a href="/login">Войти</a> или{" "}
      <a href="/registration">Зарегистрироваться</a>
      <LoginForm />
    </>
  );
}
