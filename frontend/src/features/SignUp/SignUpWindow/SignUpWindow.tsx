import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import ModalWindow from "../../../widgets/ModalWindow/ModalWindow";
import { setSignupOpen } from "@/shared/redux/GlobalSlice";
import SignUpForm from "../SignUpForm/SignUpForm";

interface SignUpWindowProps {}

const SignUpWindow: React.FC<SignUpWindowProps> = () => {
  const dispatch = useAppDispatch();
  const isSignUpOpen = useAppSelector((state) => state.global.signupOpen);

  return (
    <ModalWindow
      visible={isSignUpOpen}
      setVisible={() => {
        dispatch(setSignupOpen(false));
      }}
    >
      <header>
        <h6>Регистрация</h6>
      </header>
      <SignUpForm />
    </ModalWindow>
  );
};

export default SignUpWindow;
