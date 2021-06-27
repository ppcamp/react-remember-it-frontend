import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frontView: "",
  backView: "",
};

type Action = {
  type: string;
  front?: string;
  backView?: string;
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateFront(state, action: Action) {
      console.log("Updated front");
      state.frontView = action.front as string;
    },
    updateBack(state, action: Action) {
      console.log("Updated Back");
      state.backView = action.backView as string;
    },
  },
});

export default cardSlice;

export const cardActions = cardSlice.actions;
