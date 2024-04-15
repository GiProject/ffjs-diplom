import { useAppDispatch } from "@/shared/hooks/redux";
import { setLoginOpen } from "@/shared/redux/GlobalSlice";
import { useUserSignUpMutation } from "@/shared/redux/api/generalAPI";
import { logout, setAccessToken, setUser } from "@/shared/redux/auth/authSlice";
import { useEffect, useState } from "react";

export default function useSignIn() {
  const [registerUser, { data, isLoading, isError, error }] =
    useUserSignUpMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isError) {
      if (data.access_token) {
        dispatch(setAccessToken(data.access_token));
      }
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
    registerUser,
    isLoading,
    isError,
    isSuccess,
    error: error?.data,
  };
}
