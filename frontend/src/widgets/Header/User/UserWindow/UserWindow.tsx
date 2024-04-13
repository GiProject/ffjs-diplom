import { useAppDispatch } from "@/shared/hooks/redux";
import { logout } from "@/shared/redux/auth/authSlice";
import Button from "@/shared/ui/Button/Button";
import ModalWindow from "@/widgets/ModalWindow/ModalWindow";

interface UserWindowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserWindow: React.FC<UserWindowProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };
  return (
    <ModalWindow
      visible={open}
      setVisible={() => {
        setOpen(false);
      }}
    >
      <header>
        <h6>Войти</h6>
      </header>
      <section>
        <Button onClick={handleLogout}>Выйти из аккаунта</Button>
      </section>
    </ModalWindow>
  );
};

export default UserWindow;
