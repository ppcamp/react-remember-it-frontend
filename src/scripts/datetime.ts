import jwt from "jsonwebtoken";

/**
 * Convert the jwt string property to a valid date
 *
 * @param {string} token The JWT token string.
 * @returns {number} The `exp` param converted into milliseconds. Returns -1 if some error occurred
 * @see Date().getTime()
 * @see https://stackoverflow.com/a/51940938/10013122
 */
export const jwt_to_date = (token:string):number => {
  if (!token) return -1;

  // Checking if tokens exists
  let decoded:jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload;
  if (!decoded) return -1;
  const { exp } = decoded;
  if (!exp) return -1;
  return exp * 1e3;
};
