import { createSlice } from "@reduxjs/toolkit";
import { parseJSON } from "@/shared/utils/parseJSON";

// initialize userToken from local storage
const userToken =
  typeof window !== "undefined" && localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const refreshToken =
  typeof window !== "undefined" && localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : null;

const userInfo =
  typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? parseJSON(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userInfo: userInfo, // for user object
  userToken, // for storing the JWT
  refreshToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
    },
    setUser: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    setAccessToken: (state, { payload }) => {
      state.userToken = payload.access_token;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem("userToken", payload.access_token);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },
  },
});

export const { logout, setUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
