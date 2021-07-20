/* eslint-disable no-useless-escape */

// Password
export const REGEX_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/g;

// Email
export const REGEX_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

// Common
export const REGEX_HAS_SPECIAL_CHARS =
  /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g;

export const REGEX_HAS_DIGITS = /^(?=.*\d+)/g;

export const REGEX_HAS_LETTERS = /^(?=.*[a-z])(?=.*[A-Z])/g;
