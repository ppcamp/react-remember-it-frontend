import { createSlice } from "@reduxjs/toolkit";
import { DeckType } from "scripts/types";

const initialState: DeckType = {
  id: "",
  title: "",
  description: "",
  cards: null,
  review: null,
};

type Action = {
  type: string;
  payload: DeckType;
};

const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    update(state, action: Action) {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.cards = action.payload.cards;
      state.review = action.payload.review;
    },
  },
});

export default deckSlice;

export const deckActions = deckSlice.actions;
