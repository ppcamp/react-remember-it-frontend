import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, DeckType } from "scripts/types/types";

const initialState: DeckType[] = [];

type DeckId = {
  deckId: string;
};

enum Errors {
  NotFoundDeck = "Couldn't find any deck that has this id.",
  NotFoundCard = "Couldn't find any card into that deck.",
}

const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    /**
     * Update all decks into the store
     * @param payload The new decks to put into store
     */
    update(state, { payload }: PayloadAction<DeckType[]>) {
      state = payload;
    },

    /**
     * Add new elements into the store
     * @param payload The new decks to push into store
     */
    append(state, { payload }: PayloadAction<DeckType[]>) {
      state.push(...payload);
    },

    /**
     * Remove a deck basing on its id
     * @param id The id of the element that will be removed
     */
    remove(state, { payload: id }: PayloadAction<string>) {
      const pos = state.findIndex((d) => d.id === id);
      if (pos === -1) {
        throw new Error(Errors.NotFoundDeck);
      } else {
        state.splice(pos, 1);
      }
    },

    /**
     * Remove some element and insert a new one into the deck store
     * @param deck Some deck to update.
     * @note The update will use the deck id to search for it
     */
    splice(state, { payload: deck }: PayloadAction<DeckType>) {
      const pos = state.findIndex((d) => d.id === deck.id);
      if (pos === -1) {
        throw new Error(Errors.NotFoundDeck);
      } else {
        state.splice(pos, 1, deck); // update the deck at this position
      }
    },

    /**
     * Remove a card from a given deck
     * @param deckId The deck where the card are
     * @param cardId The card that will be removed
     */
    removeCardFromDeck(
      state,
      {
        payload: { deckId, cardId },
      }: PayloadAction<DeckId & { cardId: string }>
    ) {
      const pos = state.findIndex((d) => d.id === deckId);
      if (pos === -1) {
        throw new Error(Errors.NotFoundDeck);
      } else {
        const cardPos = state[pos].cards.findIndex((c) => c.id === cardId);
        if (pos === -1) {
          throw new Error(Errors.NotFoundCard);
        } else {
          state[pos].cards.splice(cardPos, 1);
        }
      }
    },

    /**
     * Remove a card from a given deck
     * @param deckId The deck where the card are
     * @param cardId The card that will be removed
     */
    updateCardFromDeck(
      state,
      { payload: { deckId, card } }: PayloadAction<DeckId & { card: CardType }>
    ) {
      const pos = state.findIndex((d) => d.id === deckId);
      if (pos === -1) {
        throw new Error(Errors.NotFoundDeck);
      } else {
        const cardPos = state[pos].cards.findIndex((c) => c.id === card.id);
        if (pos === -1) {
          throw new Error(Errors.NotFoundCard);
        } else {
          state[pos].cards.splice(cardPos, 1, card);
        }
      }
    },

    /**
     * Remove a card from a given deck
     * @param deckId The deck where the card are
     * @param cardId The card that will be removed
     */
    addCardIntoDeck(
      state,
      { payload: { deckId, card } }: PayloadAction<DeckId & { card: CardType }>
    ) {
      let pos = state.findIndex((d) => d.id === deckId);
      if (pos === -1) {
        throw new Error(Errors.NotFoundDeck);
      } else {
        state[pos].cards.splice(0, 0, card);
      }
    },
  },
});

export default deckSlice;
