import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frontView: "",
  backView: "",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateFront(state, action) {
      console.log("Updated front");
      state.frontView = action.front;
    },
    updateBack(state, action) {
      console.log("Updated Back");
      state.BackView = action.backView;
    },
  },
});

export default cardSlice;

export const cardActions = cardSlice.actions;
