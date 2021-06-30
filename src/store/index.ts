import emailSlice from "./slices/email";
import cardSlice from "./slices/card";
import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./slices/deck";
import cardReviewSlice from "./slices/review";

export const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    email: emailSlice.reducer,
    deck: deckSlice.reducer,
    cardsReview: cardReviewSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
