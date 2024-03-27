import Header from "../Header/Header";
import SignInWindow from "../SignInWindow/SignInWindow";
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
        {children}
      </div>
      <>
        <SignInWindow />
      </>
    </main>
  );
};

export default Template;
