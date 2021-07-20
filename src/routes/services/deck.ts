import { Dashboard } from "pages/dashboard";
import { DeckPage } from "pages/[deck]/[id]";
import { RouteObject } from "scripts/types/shared-types";

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
