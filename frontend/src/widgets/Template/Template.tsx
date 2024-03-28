import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import s from "./Template.module.scss";

//Modals
import SignInWindow from "../../features/SignIn/SignInWindow/SignInWindow";
import SignUpWindow from "@/features/SignUp/SignInWindow/SignUpWindow";

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
        <SignUpWindow />
      </>
    </main>
  );
};

export default Template;
