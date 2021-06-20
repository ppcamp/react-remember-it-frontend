import jwt from "jsonwebtoken";

/**
 * Convert the jwt string property to a valid date
 *
 * @param {string} token The JWT token string.
 * @returns {number} The `exp` param converted into milliseconds
 * @see Date().getTime()
 * @see https://stackoverflow.com/a/51940938/10013122
 */
export const jwt_to_date = (token) => {
  // Checking if tokens exists
  const decoded = jwt.decode(token);
  const { exp: expiresIn } = decoded;
  return expiresIn * 1e3;
};
