import React from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

import Input from "../../../UI/Input/Input";
import InputDate from "../../../UI/Input/InputDate";
import moment from "moment";
import Button from "../../../UI/Button/Button";
import Body from "../../../General/Body/Body";
import Upload from "../../../UI/UploadImage/Upload";

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
      description: "",
      images: [],
    },
  });

  async function onSubmitForm(values: any) {
    console.log(values);
    // TODO: request data
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <Upload name="images" control={control} options={{}} />
        <Input
          label={"Название отеля"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="title"
          type="text"
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
        <Input
          label={"Описание отеля"}
          icon={<></>}
          errors={errors}
          register={register}
          watch={watch}
          id="description"
          type="text"
          options={{
            required: "Введите описание отеля",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[а-яА-Я!?,+=]*/g, "");
            },
            minLength: {
              value: 3,
              message: "Описание отеля: от 3 символов",
            },
            maxLength: {
              value: 50,
              message: "Описание отеля: до 50 символов",
            },
          }}
        />
        <div className={s.Columns}>
          <Button type="submit">Сохранить</Button>
        </div>
      </div>
      {Object.entries(errors).length > 0 && (
        <div className={s.Errors}>
          {errors?.title?.message && <span>{errors?.title?.message}</span>}
          {errors?.description?.message && (
            <span>{errors?.description?.message}</span>
          )}
        </div>
      )}
    </form>
  );
};

export default FormHotels;
