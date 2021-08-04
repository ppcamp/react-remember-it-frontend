import { ApiNotFoundException } from "scripts/errors/api-not-found";

type EndpointsType = {
  users: () => URL;
  login: () => URL;
  refresh_token: () => URL;
  health_check: () => URL;
  api: () => URL;
  card: () => URL;
  deck: () => URL;
};

/**
 * Returns the endpoint urls
 * @returns The endpoints urls
 */
function GetEndpoints(): EndpointsType {
  const API = process.env.REACT_APP_API;
  if (!API) {
    throw new ApiNotFoundException();
  }
  const base_url = new URL(API);

  const e: EndpointsType = {
    users: () => new URL("/users", base_url),
    login: () => new URL("/auth/login", base_url),
    refresh_token: () => new URL("/auth/refresh-token", base_url),
    health_check: () => new URL("/", base_url),
    api: () => new URL("/api", base_url),
    card: () => new URL("/card", base_url),
    deck: () => new URL("/deck", base_url),
  };

  return e;
}

export const Endpoints = GetEndpoints();
