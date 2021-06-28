import { Dashboard } from "pages/Dashboard";
import { DeckPage } from "pages/Deck";
import { RouteObject } from "scripts/shared-types";

export const deckRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/deck/:id",
    component: DeckPage,
  },
];
