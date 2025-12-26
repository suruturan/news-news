import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "../../shared/api/newsApi";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(newsApi.middleware),
});
