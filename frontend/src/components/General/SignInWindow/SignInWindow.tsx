import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ModalWindow from "../ModalWindow/ModalWindow";
import { setLoginOpen } from "@/redux/GlobalSlice";
import SignInForm from "@/components/Pages/SignIn/SignInForm/SignInForm";

interface SignInWindowProps {}

const SignInWindow: React.FC<SignInWindowProps> = () => {
  const dispatch = useAppDispatch();
  const isLoginOpen = useAppSelector((state) => state.global.loginOpen);

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
    </ModalWindow>
  );
};

export default SignInWindow;
