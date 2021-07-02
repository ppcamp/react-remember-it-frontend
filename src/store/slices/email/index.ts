import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export default emailSlice;
