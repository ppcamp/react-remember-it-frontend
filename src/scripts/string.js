export const insert_at = function (str, index, replacement, replace = 1) {
  return str.substr(0, index) + replacement + str.substr(index + replace);
};
