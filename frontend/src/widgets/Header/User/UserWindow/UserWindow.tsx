import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { logout } from "@/shared/redux/auth/authSlice";
import Button from "@/shared/ui/Button/Button";
import ModalWindow from "@/widgets/ModalWindow/ModalWindow";

interface UserWindowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserWindow: React.FC<UserWindowProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const { userInfo }: any = useAppSelector((state) => state.auth);

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
        <h6>Мой профиль</h6>
      </header>
      <section>
        <ul>
          {userInfo?.email && (
            <li>
              Почта: <span>{userInfo.email}</span>
            </li>
          )}
          {userInfo?.name && (
            <li>
              Имя: <span>{userInfo.name}</span>
            </li>
          )}
          {userInfo?.contactPhone && (
            <li>
              Телефон: <span>{userInfo.contactPhone}</span>
            </li>
          )}
          {userInfo?.role && (
            <li>
              Роль: <span>{userInfo.role}</span>
            </li>
          )}
        </ul>
      </section>
      <Button onClick={handleLogout}>Выйти из аккаунта</Button>
    </ModalWindow>
  );
};

export default UserWindow;
