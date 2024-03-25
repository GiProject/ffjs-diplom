"use client";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import s from "./Button.module.scss";
interface ButtonProps {
  children: string;
  style?: string;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  type,
  disabled,
  isLoading,
}) => {
  switch (type) {
    case "submit":
      return (
        <button
          className={[s.Button, disabled ? s.Disabled : ""].join(" ")}
          data-style={style}
        >
          {!isLoading ? <span>{children}</span> : <ButtonLoader />}
        </button>
      );
    default:
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
  }
};

export default Button;
