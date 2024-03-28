import s from "./Body.module.scss";
interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className={s.Body}>{children}</div>;
};

export default Body;
