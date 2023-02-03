import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slice/blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
