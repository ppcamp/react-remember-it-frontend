import cardSlice from "./slices/card";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { card: cardSlice.reducer },
});
