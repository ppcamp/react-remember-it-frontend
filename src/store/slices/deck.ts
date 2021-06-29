import { createSlice } from "@reduxjs/toolkit";
import { DeckType } from "scripts/types";

const initialState: DeckType = {
  id: "",
  title: "",
  description: "",
  cards: undefined,
  review: undefined,
};

type Deck = { [Key in keyof DeckType]?: DeckType[Key] };

type Action = {
  type: string;
  payload: Deck;
};

const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    update(
      state,
      { payload: { cards, description, id, review, title } }: Action
    ) {
      if (title) state.title = title;
      if (description) state.description = description;
      if (cards) state.cards = cards;
      if (review) state.review = review;
      if (id) state.id = id;
    },
  },
});

export default deckSlice;

export const deckActions = deckSlice.actions;
