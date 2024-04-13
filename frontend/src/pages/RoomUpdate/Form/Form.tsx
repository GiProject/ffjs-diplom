import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./Form.module.scss";

//Icons
import IconTitle from "@/shared/assets/form-icon-title.svg";

import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import Upload from "@/shared/ui/UploadImage/Upload";
import { useRoomUpdateMutation } from "@/shared/redux/api/generalAPI";
import { useNavigate } from "react-router";

interface FormroomsProps {
  room: any;
}

const Formrooms: React.FC<FormroomsProps> = ({ room }) => {
  const [roomUpdate, { data, isLoading, isError, error }] =
    useRoomUpdateMutation();
  const navigate = useNavigate();
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);

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
      description: String(room?.description),
      images: [],
    },
  });

  async function onSubmitForm(values: any) {
    const formData = new FormData();
    formData.append("description", values.description);

    if (deletedFiles.length > 0) {
      deletedFiles.forEach((value) => {
        formData.append("delete_image[]", value.toString());
      });
    }

    values.images.forEach((imageFile: any) => {
      formData.append("images", imageFile);
    });
    await roomUpdate({ formData, id: room?._id });
  }

  useEffect(() => {
    if (data && !isError) {
      setTimeout(() => navigate(`/rooms/${room._id}`, { replace: true }), 500);
    }
  }, [data, isError]);

  if (!isLoading) {
    return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className={s.Form}>
          <Upload
            name="images"
            control={control}
            options={{}}
            defaultValue={
              room?.images.length > 0
                ? room?.images.map((image: string) => {
                    return `${process.env.BASE_URL}${image}`;
                  })
                : []
            }
            deletedFiles={deletedFiles}
            setDeletedFiles={setDeletedFiles}
          />

          <Input
            label={"Описание номера"}
            icon={<IconTitle />}
            errors={errors}
            register={register}
            watch={watch}
            id="description"
            type="text"
            options={{
              required: "Введите описание номера",
              onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
                e.target.value = e.target.value.replace(/[а-яА-Я!?,+=]*/g, "");
              },
              minLength: {
                value: 3,
                message: "Описание номера: от 3 символов",
              },
              maxLength: {
                value: 50,
                message: "Описание номера: до 50 символов",
              },
            }}
          />
          <div className={s.Columns}>
            <Button
              type="submit"
              isLoading={isLoading}
              isSuccess={data !== undefined && data !== null}
            >
              Обновить номер
            </Button>
          </div>
        </div>
        {Object.entries(errors).length > 0 && (
          <div className={s.Errors}>
            {errors?.images?.message && <span>{errors?.images?.message}</span>}
            {errors?.description?.message && (
              <span>{errors?.description?.message}</span>
            )}
            {isError && <span>{error.message}</span>}
          </div>
        )}
      </form>
    );
  } else {
    return false;
  }
};

export default Formrooms;
