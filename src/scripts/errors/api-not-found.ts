export class ApiNotFoundException extends Error {
  constructor() {
    super("Api wasn't defined in .env file.");
  }
}
