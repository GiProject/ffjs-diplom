import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalSlice {}

const initialState: GlobalSlice = {};

export const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = GlobalSlice.actions;

export default GlobalSlice.reducer;
