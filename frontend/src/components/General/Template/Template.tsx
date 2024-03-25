import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import s from "./Template.module.scss";
interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <main className={s.Template}>
      <Header />
      <div className={s.Content}>
        <Sidebar />
        <div className={s.ContentBody}>{children}</div>
      </div>
    </main>
  );
};

export default Template;
