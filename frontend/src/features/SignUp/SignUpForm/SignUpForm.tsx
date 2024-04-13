import React from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import useSignIn from "./SignUp.hook";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const { registerUser, isLoading, isError, isSuccess, error } = useSignIn();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      contactPhone: "",
    },
  });

  async function onSubmitForm(values: any) {
    await registerUser(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <Input
          label={"Email"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="email"
          type="text"
          defaultValue={""}
          options={{
            required: "Введите Email",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value
                .replace(/[^а-яА-Яa-zA-Z0-9-_.@]*/g, "")
                .replace(/\s/g, "")
                .replace(/^-/g, "")
                .replace(/-{2,}/g, "-");
            },
            minLength: {
              value: 5,
              message: "Email: 5 min.",
            },
            maxLength: {
              value: 40,
              message: "Email: 40 max",
            },
            pattern: {
              value: /^[а-яА-ЯA-Z0-9._%+-]+@[а-яА-ЯA-Z0-9.-]+\.[А-ЯA-Z]{2,}$/i,
              message: "Email: wrong format",
            },
          }}
        />
        <Input
          label={"Имя"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="name"
          type="text"
          defaultValue={""}
          options={{
            required: "Введите имя",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value
                .replace(/[^a-zA-Zа-яА-Я-\s]*/g, "")
                .replace(/^\s/g, "")
                .replace(/^-/g, "")
                .replace(/\s{2,}/g, " ")
                .replace(/-{2,}/g, "-")
                .replace(/-\s/g, "-")
                .replace(/\s-/g, "-");
            },
            minLength: {
              value: 2,
              message: "Имя — от 2 символов",
            },
            maxLength: {
              value: 30,
              message: "Имя — до 30 символов",
            },
            pattern: {
              value: /^[a-zA-Zа-яА-Я\s-]*$/,
              message: "Имя — ошибка формата",
            },
          }}
        />
        <Input
          label={"Телефон"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="contactPhone"
          minLength={10}
          maxLength={10}
          type="text"
          defaultValue={""}
          options={{
            required: "Введите имя",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, "");
            },
            minLength: {
              value: 10,
              message: "Телефон — 10 символов",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Телефон — ошибка формата",
            },
          }}
        />

        <Input
          label={"Пароль"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="password"
          type="password"
          defaultValue={""}
          options={{
            required: "Введите пароль",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[а-яА-Я\s]*/g, "");
            },
            minLength: {
              value: 5,
              message: "Pass: 5 min.",
            },
            maxLength: {
              value: 30,
              message: "Pass: 5 max",
            },
          }}
        />
        <Button type="submit" isLoading={isLoading} isSuccess={isSuccess}>
          Войти
        </Button>
      </div>
      {(Object.entries(errors).length > 0 || isError) && (
        <div className={s.Errors}>
          {errors?.email?.message && <span>{errors?.email?.message}</span>}
          {errors?.name?.message && <span>{errors?.name?.message}</span>}
          {errors?.contactPhone?.message && (
            <span>{errors?.contactPhone?.message}</span>
          )}
          {errors?.password?.message && (
            <span>{errors?.password?.message}</span>
          )}
          {isError && <span>{error.message}</span>}
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
