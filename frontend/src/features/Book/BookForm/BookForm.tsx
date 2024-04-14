import React from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

//Icons
import IconCalendar from "@/shared/assets/form-icon-calendar.svg";

//Components
import Button from "@/shared/ui/Button/Button";
import useBook from "./Book.hook";
import InputDate from "@/shared/ui/Input/InputDate";
import moment from "moment";

interface BookFormProps {
  roomId: string;
}

const BookForm: React.FC<BookFormProps> = ({ roomId }) => {
  const { bookRoom, isLoading, isError, isSuccess, error } = useBook();

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
      dateStart: "",
      dateEnd: "",
    },
  });

  async function onSubmitForm(values: any) {
    const args = {
      dateStart: moment(values.dateStart).format("YYYY-MM-DD"),
      dateEnd: moment(values.dateEnd).format("YYYY-MM-DD"),
      roomId: roomId,
    };
    await bookRoom(args);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={s.Form}>
        <InputDate
          name="dateStart"
          icon={<IconCalendar />}
          control={control}
          errors={errors}
          label={"Заезд"}
          options={{
            required: "Введите дату начала",
          }}
          minDate={moment().subtract(1, "day")}
          maxDate={getValues("dateEnd") ? getValues("dateEnd") : undefined}
        />
        <InputDate
          name="dateEnd"
          icon={<IconCalendar />}
          control={control}
          errors={errors}
          label={"Выезд"}
          options={{
            required: "Введите дату конца",
          }}
          minDate={getValues("dateStart") ? getValues("dateStart") : undefined}
          disabled={getValues("dateStart") ? false : true}
        />
        <Button type="submit">Забронировать</Button>
        {Object.entries(errors).length > 0 ||
          (isError && (
            <div className={s.Errors}>
              {errors?.dateStart?.message && (
                <span>{errors?.dateStart?.message}</span>
              )}
              {errors?.dateEnd?.message && (
                <span>{errors?.dateEnd?.message}</span>
              )}
              {isError && <span>{error.message}</span>}
            </div>
          ))}
      </div>
    </form>
  );
};

export default BookForm;
