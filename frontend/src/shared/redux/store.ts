import { configureStore } from "@reduxjs/toolkit";
import GlobalStateReducer from "./GlobalSlice";
import authReducer from "@/shared/redux/auth/authSlice";
import { generalAPI } from "./api/generalAPI";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: GlobalStateReducer,
    [generalAPI.reducerPath]: generalAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
