import React from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

//Icons
import IconEmail from "@/shared/assets/form-icon-email.svg";
import IconPass from "@/shared/assets/form-icon-pass.svg";

import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import useSignIn from "./SignIn.hook";

interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = () => {
  const { loginUser, isLoading, isError, isSuccess, error } = useSignIn();

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
    },
  });

  async function onSubmitForm(values: any) {
    await loginUser(values);
    // TODO: request data
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <Input
          label={"Email"}
          icon={<IconEmail />}
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
          label={"Пароль"}
          icon={<IconPass />}
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
          {errors?.password?.message && (
            <span>{errors?.password?.message}</span>
          )}
          {isError && <span>{error.message}</span>}
        </div>
      )}
    </form>
  );
};

export default SignInForm;
