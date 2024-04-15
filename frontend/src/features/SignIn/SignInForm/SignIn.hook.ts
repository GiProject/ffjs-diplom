import { useAppDispatch } from "@/shared/hooks/redux";
import { setLoginOpen } from "@/shared/redux/GlobalSlice";
import { useUserSignInMutation } from "@/shared/redux/api/generalAPI";
import { logout, setAccessToken, setUser } from "@/shared/redux/auth/authSlice";
import { useEffect, useState } from "react";

export default function useSignIn() {
  const [loginUser, { data, isLoading, isError, error }] =
    useUserSignInMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isError) {
      dispatch(setAccessToken(data));
      dispatch(setUser(data));
      setIsSuccess(true);
      setTimeout(() => {
        dispatch(setLoginOpen(false));
        setIsSuccess(false);
      }, 1000);
    }
    if (isError) {
      dispatch(logout());
    }
  }, [data, isError]);

  return {
    loginUser,
    isLoading,
    isError,
    isSuccess,
    error: error?.data,
  };
}
