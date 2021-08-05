import { CardType } from "./types";

export type CardCreatePayload = {
  front: string;
  back: string;
  deck: string;
};

export type CardResponsePayload = CardType;
