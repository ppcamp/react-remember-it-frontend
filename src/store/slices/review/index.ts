import { createSlice } from "@reduxjs/toolkit";
import { CardType } from "scripts/types/types";

type Cardtype = {
  cards: CardType[];
};
const init: Cardtype = {
  cards: [],
};

type Action = {
  type: string;
  payload: CardType[];
};

type ActionOnce = {
  type: string;
  payload: {
    pos: number;
    n: number;
    EF: number;
    I: number;
  };
};
const cardReviewSlice = createSlice({
  name: "cardsReview",
  initialState: init,
  reducers: {
    update(state, { payload }: Action) {
      state.cards = payload;
    },
    updateByPos(state, { payload: { pos, EF, I, n } }: ActionOnce) {
      state.cards[pos].EF = EF;
      state.cards[pos].I = I;
      state.cards[pos].n = n;
    },
  },
});

export default cardReviewSlice;
