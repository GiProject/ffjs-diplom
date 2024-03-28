import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalSlice {
  loginOpen: boolean;
  signupOpen: boolean;
}

const initialState: GlobalSlice = {
  loginOpen: false,
  signupOpen: false,
};

export const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoginOpen: (state, action: PayloadAction<boolean>) => {
      state.loginOpen = action.payload;
    },
    setSignupOpen: (state, action: PayloadAction<boolean>) => {
      state.signupOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginOpen, setSignupOpen } = GlobalSlice.actions;

export default GlobalSlice.reducer;
