export const JwtHeader = (token: string) => {
  return { Authorization: "Bearer " + token };
};
