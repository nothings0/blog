import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    list: [],
  },
  reducers: {
    listBlogs: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { listBlogs } = blogSlice.actions;
export default blogSlice.reducer;
