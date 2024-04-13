import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import s from "./Template.module.scss";
import Container from "@/shared/components/Container/Container";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <main className={s.Template}>
          <div className={s.Content}>
            <Sidebar />
            {children}
          </div>
        </main>
      </Container>
    </>
  );
};

export default Template;
