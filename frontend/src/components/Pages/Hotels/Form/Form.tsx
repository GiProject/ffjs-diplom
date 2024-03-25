import React from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

import Input from "../../../UI/Input/Input";
import InputDate from "../../../UI/Input/InputDate";
import moment from "moment";
import Button from "../../../UI/Button/Button";

interface FormHotelsProps {}

const FormHotels: React.FC<FormHotelsProps> = () => {
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
      title: "",
      startDate: "",
      finishDate: "",
    },
  });

  async function onSubmitForm(values: any) {
    console.log(values);
    // TODO: request data
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <Input
          label={"Название отеля"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="title"
          type="text"
          defaultValue={""}
          options={{
            required: "Введите название отеля",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[а-яА-Я!?,+=]*/g, "");
            },
            minLength: {
              value: 3,
              message: "Название отеля: от 3 символов",
            },
            maxLength: {
              value: 50,
              message: "Название отеля: до 50 символов",
            },
          }}
        />
        <div className={s.Columns}>
          <InputDate
            name="startDate"
            icon={<></>}
            control={control}
            errors={errors}
            label={"Начало"}
            options={{
              required: "Введите дату начала",
            }}
            minDate={moment().subtract(1, "day")}
            maxDate={
              getValues("finishDate") ? getValues("finishDate") : undefined
            }
          />
          <InputDate
            name="finishDate"
            icon={<></>}
            control={control}
            errors={errors}
            label={"Конец"}
            options={{
              required: "Введите дату конца",
            }}
            minDate={
              getValues("startDate") ? getValues("startDate") : undefined
            }
            disabled={getValues("startDate") ? false : true}
          />
          <Button type="submit">Найти</Button>
        </div>
      </div>
      {Object.entries(errors).length > 0 && (
        <div className={s.Errors}>
          {errors?.title?.message && <span>{errors?.title?.message}</span>}
          {errors?.startDate?.message && (
            <span>{errors?.startDate?.message}</span>
          )}
          {errors?.finishDate?.message && (
            <span>{errors?.finishDate?.message}</span>
          )}
        </div>
      )}
    </form>
  );
};

export default FormHotels;
