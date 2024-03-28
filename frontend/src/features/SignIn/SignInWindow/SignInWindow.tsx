import c from "@/shared/styles/Forms.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import ModalWindow from "../../../widgets/ModalWindow/ModalWindow";
import { setLoginOpen, setSignupOpen } from "@/shared/redux/GlobalSlice";
import SignInForm from "@/features/SignIn/SignInForm/SignInForm";

interface SignInWindowProps {}

const SignInWindow: React.FC<SignInWindowProps> = () => {
  const dispatch = useAppDispatch();
  const isLoginOpen = useAppSelector((state) => state.global.loginOpen);

  const handleSignUp = () => {
    dispatch(setLoginOpen(false));
    dispatch(setSignupOpen(true));
  };

  return (
    <ModalWindow
      visible={isLoginOpen}
      setVisible={() => {
        dispatch(setLoginOpen(false));
      }}
    >
      <header>
        <h6>Войти</h6>
      </header>
      <SignInForm />

      <section className={c.Actions}>
        <p>Нет аккаунта?</p>
        <div className={c.Link} onClick={handleSignUp}>
          Зарегистрироваться
        </div>
      </section>
    </ModalWindow>
  );
};

export default SignInWindow;
