import { Dashboard } from "pages/Dashboard";
import { DeckPage } from "pages/[deck]/[id]";
import { RouteObject } from "scripts/types/router";

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
