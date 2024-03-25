"use client";
import { forwardRef, useRef, useState } from "react";
import s from "./Input.module.scss";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { useController } from "react-hook-form";
import moment from "moment";

interface InputDateProps {
  name: string;
  control: any;
  label: string;
  icon: JSX.Element;
  id?: string;
  options?: any;
  errors?: any;
  utc?: boolean;
  minDate?: any;
  maxDate?: any;
  disabled?: boolean;
  defaultValue?: string;
}

const InputDate: React.FC<InputDateProps> = ({
  name,
  control,
  errors,
  label,
  id,
  options,
  icon,
  utc,
  minDate,
  maxDate,
  disabled,
  defaultValue,
}) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: options,
  });

  function checkDate(current: any, selectedDate: any) {
    if (minDate || maxDate) {
      if (minDate && !maxDate) {
        return current.isAfter(minDate);
      }
      if (maxDate && !minDate) {
        return current.isBefore(maxDate);
      }
      if (minDate && maxDate) {
        return current.isBetween(minDate, maxDate);
      }
    } else {
      return true;
    }
  }

  const CustomInputDate = forwardRef(
    (
      {
        value,
        onClick,
        onChange,
      }: { value?: any; onClick?: () => void; onChange?: () => void },
      ref: any
    ) => (
      <div
        className={`${s.Field} ${s.Date} ${s.content} ${
          errors && errors[name] ? s.error : ""
        }`}
      >
        <div className={s.icon}>{icon}</div>
        <input
          ref={ref}
          value={value}
          onClick={onClick}
          onChange={onChange} //
          type="text"
          placeholder="DD/MM/YYYY HH:MM"
          className={s.input}
          disabled={disabled}
        />
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
      </div>
    )
  );

  CustomInputDate.displayName = "CustomInputDate";

  return (
    <>
      <div className={s.DatePicker}>
        <Datetime
          dateFormat="DD/MM/YYYY"
          renderInput={(props) => {
            return <CustomInputDate {...props} />;
          }}
          onChange={(val: any) => {
            field.onChange(val ? val.toISOString() : "");
          }}
          initialValue={defaultValue ? moment(defaultValue) : ""}
          strictParsing={true}
          closeOnSelect={true}
          isValidDate={checkDate}
          utc={utc}
        />
      </div>
    </>
  );
};

export default InputDate;
