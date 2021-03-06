import { CardType, DeckType } from "scripts/types/types";
import { v4 as uuidv4 } from "uuid";

export namespace Mocks {
  export const Cards = (length: number): CardType[] =>
    Array.from({ length }, (_, i) => {
      const a: CardType = {
        back: `Parte de trás do card ${i}`,
        front: `Parte da frente do card ${i}`,
        id: uuidv4(),
        n: 0,
        EF: 2.5,
        I: 0,
      };
      return a;
    });

  /**
   * Create decks with random id
   * @param length The number of elements into this mocking
   * @returns An array of decks
   */
  export const Decks = (
    length: number,
    cardsLength: number = 10,
    cardsReview: number = 3
  ): DeckType[] =>
    Array.from({ length }, (_, i) => {
      const el: DeckType = {
        review: Cards(cardsReview),
        cards: Cards(cardsLength),
        id: uuidv4(),
        title: `Some title for deck #${i}`,
        description:
          "Qui eiusmod sint mollit ullamco aliquip tempor pariatur ipsum ut mollit minim sint. Lorem exercitation id minim in e.",
      };
      return el;
    });
}
