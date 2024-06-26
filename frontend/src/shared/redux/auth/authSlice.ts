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
      state.refreshToken = null;
      state.userToken = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
    },
    setUser: (state, { payload }) => {
      const userModel = {
        contactPhone: payload?.contactPhone,
        email: payload?.email,
        name: payload?.name,
        role: payload?.role,
      };
      state.userInfo = userModel;
      localStorage.setItem("userInfo", JSON.stringify(userModel));
    },
    setAccessToken: (state, { payload }) => {
      if (payload.access_token) {
        state.userToken = payload.access_token;
        localStorage.setItem("userToken", payload.access_token);
      }
      if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
        localStorage.setItem("refreshToken", payload.refreshToken);
      }
    },
  },
});

export const { logout, setUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
