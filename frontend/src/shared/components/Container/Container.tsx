"use client";
import s from "./Container.module.scss";
interface ContainerProps {
  children: any;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={s.Container}>{children}</div>;
};

export default Container;
