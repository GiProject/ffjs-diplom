import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

//Icons
import IconTitle from "@/shared/assets/form-icon-title.svg";

import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import Upload from "@/shared/ui/UploadImage/Upload";
import { useHotelAddMutation } from "@/shared/redux/api/generalAPI";
import { useNavigate } from "react-router";

interface FormHotelsProps {}

const FormHotels: React.FC<FormHotelsProps> = () => {
  const [hotelAdd, { data, isLoading, isError, error }] = useHotelAddMutation();
  const navigate = useNavigate();

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
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    values.images.forEach((imageFile: any) => {
      formData.append("images", imageFile);
    });
    await hotelAdd(formData);
  }

  useEffect(() => {
    if (data && !isError) {
      setTimeout(() => navigate(`/hotels/${data.id}`, { replace: true }), 500);
    }
  }, [data, isError]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <Upload
          name="images"
          control={control}
          options={{
            required: "Добавьте изображение",
          }}
        />
        <Input
          label={"Название отеля"}
          icon={<IconTitle />}
          errors={errors}
          register={register}
          watch={watch}
          id="title"
          type="text"
          options={{
            required: "Введите название отеля",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[!?,+=]*/g, "");
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
          icon={<IconTitle />}
          errors={errors}
          register={register}
          watch={watch}
          id="description"
          type="text"
          options={{
            required: "Введите описание отеля",
            onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
              e.target.value = e.target.value.replace(/[!?,+=]*/g, "");
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
          <Button type="submit" isSuccess={data !== undefined && data !== null}>
            Добавить отель
          </Button>
        </div>
      </div>
      {(Object.entries(errors).length > 0 || error?.data?.message) && (
        <div className={s.Errors}>
          {errors?.images?.message && <span>{errors?.images?.message}</span>}
          {errors?.title?.message && <span>{errors?.title?.message}</span>}
          {errors?.description?.message && (
            <span>{errors?.description?.message}</span>
          )}
          {error?.data?.message && <span>{error.data.message}</span>}
        </div>
      )}
    </form>
  );
};

export default FormHotels;
