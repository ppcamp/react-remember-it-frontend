import { DeckType } from "./types";

export type DeckCreatePayload = {
  title: string;
  description: string;
};

export type DeckEditPayload = DeckCreatePayload;
