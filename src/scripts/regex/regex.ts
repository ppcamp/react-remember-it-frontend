/* eslint-disable no-useless-escape */

// Password
export const REGEX_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Email
export const REGEX_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Common
export const REGEX_HAS_SPECIAL_CHARS =
  /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

export const REGEX_HAS_DIGITS = /^(?=.*\d+)/;

export const REGEX_HAS_LETTERS = /^(?=.*[a-z])(?=.*[A-Z])/;
