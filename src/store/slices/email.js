import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const emailSice = createSlice({
  name: "email",
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export default emailSice;

export const emailActions = emailSice.actions;
