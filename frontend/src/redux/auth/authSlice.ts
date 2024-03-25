import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  regAuthGoogle,
  regAuthApple,
} from "./authActions";
import { parseJSON } from "@/utils/parseJSON";

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
  loading: false,
  userInfo: userInfo, // for user object
  userToken, // for storing the JWT
  refreshToken,
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    setAccessToken: (state, { payload }) => {
      state.userToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem("userToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Register user
       */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userInfo = payload.profile;
        state.userToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        localStorage.setItem("userToken", payload.data.accessToken);
        localStorage.setItem("refreshToken", payload.data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(payload.profile));
      })
      .addCase(registerUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })

      /**
       * Login user
       */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // login successful
        state.userInfo = payload.profile;
        state.userToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        localStorage.setItem("userToken", payload.data.accessToken);
        localStorage.setItem("refreshToken", payload.data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(payload.profile));
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, setCredentials, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
