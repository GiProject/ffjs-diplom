"use client";
import { Link } from "react-router-dom";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import s from "./Button.module.scss";
interface ButtonProps {
  children: string;
  style?: string;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  type,
  disabled,
  isLoading,
  isSuccess,
  href,
}) => {
  switch (type) {
    case "submit":
      if (!isSuccess) {
        return (
          <button
            className={[s.Button, disabled ? s.Disabled : ""].join(" ")}
            data-style={style}
          >
            {!isLoading ? <span>{children}</span> : <ButtonLoader />}
          </button>
        );
      } else {
        return (
          <button
            className={[s.Button, disabled ? s.Disabled : ""].join(" ")}
            data-style={style}
          >
            Успешно!
          </button>
        );
      }
    default:
      if (!href) {
        return (
          <div
            className={[s.Button, disabled ? s.Disabled : ""].join(" ")}
            data-style={style}
            onClick={() => {
              onClick && onClick();
            }}
          >
            <span>{children}</span>
          </div>
        );
      } else {
        return (
          <Link to={href} className={s.Link}>
            <div
              className={[s.Button, disabled ? s.Disabled : ""].join(" ")}
              data-style={style}
            >
              <span>{children}</span>
            </div>
          </Link>
        );
      }
  }
};

export default Button;
