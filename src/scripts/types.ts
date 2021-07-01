export type CardType = {
  id: string;
  front: string;
  back: string;
  /* number of times that this card repeated */
  n: number;
  /* easy factor, start with 2.5 */
  EF: number;
  /* review in I days */
  I: number;
};

export type DeckType = {
  id: string;
  title: string;
  description: string;
  /* all cards in deck*/
  cards: CardType[];
  /* Cards to review today */
  review: CardType[];
};

export type CardSendType = {
  id?: string;
  front: string;
  back: string;
  /* number of times that this card repeated */
  n: number;
  /* easy factor, start with 2.5 */
  EF: number;
  /* review in I days */
  I: number;
};
export type DeckSendType = {
  id?: string;
  title: string;
  description: string;
  /* all cards in deck*/
  cards: CardType[];
  /* Cards to review today */
  review: CardType[];
};
