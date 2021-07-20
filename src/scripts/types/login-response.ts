/**
 * The response object for
 */
export class LoginResponse {
  /**
   * Some jwt authorized token, when parsed, it'll be something like:
   *
   *  {
   *   "userId": "e6c86fdb-688d-4c40-b8a4-b657ed323a12",
   *   "iat": 1626746173,
   *   "exp": 1627350973
   *  }
   */
  public access_token: string = "";
}
