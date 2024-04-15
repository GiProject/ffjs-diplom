import { useAppDispatch } from "@/shared/hooks/redux";
import { setBookingOpen } from "@/shared/redux/GlobalSlice";
import { useBookRoomMutation } from "@/shared/redux/api/generalAPI";
import { useEffect, useState } from "react";

export default function useBook() {
  const [bookRoom, { data, isLoading, isError, error }] = useBookRoomMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isError) {
      setIsSuccess(true);
      setTimeout(() => {
        dispatch(setBookingOpen(false));
        setIsSuccess(false);
      }, 1000);
    }
  }, [data, isError]);

  return {
    bookRoom,
    isLoading,
    isError,
    isSuccess,
    error: error?.data,
  };
}
