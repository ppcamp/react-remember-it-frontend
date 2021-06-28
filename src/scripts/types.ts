export type CardType = {
  id: string | number;
  front: string;
  back: string;
};
export type DeckType = {
  id: string | number;
  title: string;
  description: string; //
  cards: CardType[] | null; // all cards
  review: CardType[] | null; // cards to review
};

type DecksViewProps = {
  decks: DeckType[];
  fetchMoreData: () => void;
  onClickCard: any;
};
