import s from "./ButtonLoader.module.scss";
interface ButtonLoaderProps {
  inversed?: boolean;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ inversed }) => {
  return (
    <div className={[s.ButtonLoader, inversed ? s.Inversed : ""].join(" ")}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ButtonLoader;
