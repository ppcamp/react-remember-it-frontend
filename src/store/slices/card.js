import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: "ALGUM VALOR PARA A VARIÁVEL",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateFront(state, action) {},
    updateBack(state, action) {},
  },
});

export default cardSlice;

export const cardActions = cardSlice.actions;
