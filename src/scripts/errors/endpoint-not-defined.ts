export class EndpointNotDefined extends Error {
  constructor() {
    super("You must define the endpoint for this API");
  }
}
