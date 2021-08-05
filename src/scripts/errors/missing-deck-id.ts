export class MissingDeckId extends Error {
  constructor() {
    super("Couldn't find the deck id in the query");
  }
}
