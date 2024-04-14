import React from "react";

import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";
import moment from "moment";

import Button from "@/shared/ui/Button/Button";
import Body from "@/widgets/Body/Body";
import Input from "@/shared/ui/Input/Input";
import InputDate from "@/shared/ui/Input/InputDate";

//Icons
import IconCalendar from "@/shared/assets/form-icon-calendar.svg";
import IconTitle from "@/shared/assets/form-icon-title.svg";

interface FormHotelsProps {}

const FormHotels: React.FC<FormHotelsProps> = () => {
  let [searchParams, setSearchParams] = useSearchParams();

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
    let params = {
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.endDate).format("YYYY-MM-DD"),
      title: values.title,
    };
    setSearchParams(params);
  }

  return (
    <Body>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className={s.Form}>
          <Input
            label={"Название отеля"}
            icon={<IconTitle />}
            errors={errors}
            register={register}
            watch={watch}
            id="title"
            type="text"
            defaultValue={""}
            options={{
              required: false,
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
          <div className={s.Columns}>
            <InputDate
              name="startDate"
              icon={<IconCalendar />}
              control={control}
              errors={errors}
              label={"Заезд"}
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
              icon={<IconCalendar />}
              control={control}
              errors={errors}
              label={"Выезд"}
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
    </Body>
  );
};

export default FormHotels;
