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
        `${process.env.BASE_URL}/api/users/login`,
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
