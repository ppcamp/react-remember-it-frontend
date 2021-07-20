/**
 * Insert string into a giving place
 * @param str
 * @param index
 * @param replacement
 * @param replace
 * @returns
 */
export const insert_at = function (
  str: string,
  index: number,
  replacement: string,
  replace: number = 1
) {
  return str.substr(0, index) + replacement + str.substr(index + replace);
};
