// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const registerUser = createAsyncThunk<any, any>(
  "auth/register",
  async ({ email, password }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const config = {};
      const { data } = await axios.post(
        `/${process.env.NEXT_PUBLIC_API_PATH}/users/registration`,
        {
          email,
          password,
        },
        config
      );
      return data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message.payload);
      }
    }
  }
);

export const regAuthGoogle = createAsyncThunk<string, any>(
  "auth/regAuthGoogle",
  async (idToken, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/${process.env.NEXT_PUBLIC_API_PATH}/auth/google`,
        {
          deviceId: state.auth.deviceID,
          platform: "web",
          lang: state.auth.locale ?? "ru",
          idToken,
        },
        config
      );

      return data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response.data.error.code) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message.payload);
      }
    }
  }
);

export const regAuthApple = createAsyncThunk<string, any>(
  "auth/regAuthApple",
  async (identityToken, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/${process.env.NEXT_PUBLIC_API_PATH}/auth/appleid`,
        {
          deviceId: state.auth.deviceID,
          platform: state.auth.platform ?? "web",
          identityToken,
        },
        config
      );

      return data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response.data.error.code) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message.payload);
      }
    }
  }
);

export const loginUser = createAsyncThunk<any, any>(
  "auth/login",
  async ({ email, password }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/${process.env.NEXT_PUBLIC_API_PATH}/users/authentication`,
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
