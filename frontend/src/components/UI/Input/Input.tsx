import React, { useId, useState } from "react";
import s from "./Input.module.scss";

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  errors: any;
  watch: any;
  id: string;
  type?: string;
  defaultValue?: string;
  options: any;
  register: any;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
}

// TODO: types
const Input = (props: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const inputId = useId();

  return (
    <div
      className={`${s.Field} ${props.errors[props.id] ? s.error : ""} ${
        props.watch(props.id) ? s.content : ""
      } ${props.mode && s[props.mode]}`}
    >
      {props.icon && <div className={s.icon}>{props.icon}</div>}
      <input
        className={s.input}
        label={props.label}
        id={inputId}
        type={!show ? props.type : "text"}
        defaultValue={props.defaultValue}
        maxLength={props.maxLength}
        minLength={props.minLength}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.register(props.id, props.options)}
      />

      <label className={s.label} htmlFor={inputId}>
        {props.label}
      </label>
      {props.type === "password" && (
        <div
          className={s.showPassword}
          onMouseDown={() => {
            setShow(true);
          }}
          onMouseUp={() => {
            setShow(false);
          }}
        >
          pass
        </div>
      )}
    </div>
  );
};

export default Input;
