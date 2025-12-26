import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../../shared/api/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (gdm) => gdm().concat(adminApi.middleware),
});
