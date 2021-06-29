export type CardType = {
  id: string | number;
  front: string;
  back: string;
};
export type DeckType = {
  id?: string | number;
  title?: string;
  description?: string; //
  cards?: CardType[]; // all cards
  review?: CardType[]; // cards to review
};

type DecksViewProps = {
  decks: DeckType[];
  fetchMoreData: () => void;
  onClickCard: any;
};
