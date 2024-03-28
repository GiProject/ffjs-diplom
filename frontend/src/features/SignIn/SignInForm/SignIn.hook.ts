import { useAppDispatch } from "@/hooks/redux";
import { setLoginOpen } from "@/redux/GlobalSlice";
import { useUserSignInMutation } from "@/redux/api/generalAPI";
import { logout, setAccessToken } from "@/redux/auth/authSlice";
import { useEffect, useState } from "react";

export default function useSignIn() {
  const [loginUser, { data, isLoading, isError, error }] =
    useUserSignInMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isError) {
      dispatch(setAccessToken(data.access_token));
      setIsSuccess(true);
      setTimeout(() => {
        dispatch(setLoginOpen(false));
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
